package lk.ac.kln.unimart.v1.service;

import lk.ac.kln.unimart.auth.entity.Role;
import lk.ac.kln.unimart.auth.entity.UserEntity;
import lk.ac.kln.unimart.auth.repository.UserRepository;
import lk.ac.kln.unimart.v1.domain.Category;
import lk.ac.kln.unimart.v1.domain.V1Listing;
import lk.ac.kln.unimart.v1.domain.V1ListingStatus;
import lk.ac.kln.unimart.v1.dto.ListingRequest;
import lk.ac.kln.unimart.v1.dto.ListingResponse;
import lk.ac.kln.unimart.v1.dto.PagedResponse;
import lk.ac.kln.unimart.v1.exception.ConflictException;
import lk.ac.kln.unimart.v1.exception.ForbiddenException;
import lk.ac.kln.unimart.v1.exception.ResourceNotFoundException;
import lk.ac.kln.unimart.v1.repository.CategoryRepository;
import lk.ac.kln.unimart.v1.repository.V1ListingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class V1ListingService {

    private final V1ListingRepository listingRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public V1ListingService(V1ListingRepository listingRepository,
                            CategoryRepository categoryRepository,
                            UserRepository userRepository) {
        this.listingRepository = listingRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public PagedResponse<ListingResponse> getListings(String query, Long categoryId, V1ListingStatus status, int page, int size) {
        int cappedSize = Math.min(Math.max(size, 1), 50);
        Pageable pageable = PageRequest.of(Math.max(page, 0), cappedSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<V1Listing> listingPage = listingRepository.findFilteredListings(query, categoryId, status, pageable);
        List<ListingResponse> content = listingPage.getContent().stream()
                .map(ListingResponse::new)
                .toList();

        return new PagedResponse<>(content, listingPage);
    }

    @Transactional(readOnly = true)
    public ListingResponse getListingById(String id) {
        V1Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with ID: " + id));

        if (listing.getStatus() == V1ListingStatus.ARCHIVED) {
            throw new ResourceNotFoundException("Listing not found or archived: " + id);
        }

        return new ListingResponse(listing);
    }

    @Transactional
    public ListingResponse createListing(ListingRequest request, String userEmail) {
        UserEntity seller = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseGet(() -> categoryRepository.save(new Category(request.getCategoryId(), "Category " + request.getCategoryId(), "Default Category")));

        V1Listing listing = new V1Listing();
        listing.setSeller(seller);
        listing.setCategory(category);
        listing.setTitle(request.getTitle());
        listing.setDescription(request.getDescription());
        listing.setPrice(request.getPrice());
        listing.setStatus(V1ListingStatus.AVAILABLE);

        V1Listing saved = listingRepository.save(listing);
        return new ListingResponse(saved);
    }

    @Transactional
    public ListingResponse updateListing(String id, ListingRequest request, String userEmail) {
        V1Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with ID: " + id));

        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        boolean isOwner = listing.getSeller().getEmail().equalsIgnoreCase(userEmail);
        boolean isAdmin = user.getRole() == Role.ROLE_ADMIN;

        if (!isOwner && !isAdmin) {
            throw new ForbiddenException("You do not have permission to update this listing");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + request.getCategoryId()));

        listing.setTitle(request.getTitle());
        listing.setDescription(request.getDescription());
        listing.setPrice(request.getPrice());
        listing.setCategory(category);

        V1Listing updated = listingRepository.save(listing);
        return new ListingResponse(updated);
    }

    @Transactional
    public void deleteListing(String id, String userEmail) {
        V1Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with ID: " + id));

        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        boolean isOwner = listing.getSeller().getEmail().equalsIgnoreCase(userEmail);
        boolean isAdmin = user.getRole() == Role.ROLE_ADMIN;

        if (!isOwner && !isAdmin) {
            throw new ForbiddenException("You do not have permission to delete/archive this listing");
        }

        if (listing.getStatus() == V1ListingStatus.SOLD) {
            throw new ConflictException("Cannot archive a listing that is SOLD");
        }

        listing.setStatus(V1ListingStatus.ARCHIVED);
        listingRepository.save(listing);
    }
}
