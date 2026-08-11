package lk.ac.kln.unimart.listing.service;

import lk.ac.kln.unimart.auth.dto.UserDto;
import lk.ac.kln.unimart.auth.entity.UserEntity;
import lk.ac.kln.unimart.auth.repository.UserRepository;
import lk.ac.kln.unimart.listing.dto.ListingCreateDto;
import lk.ac.kln.unimart.listing.dto.ListingResponseDto;
import lk.ac.kln.unimart.listing.entity.ListingEntity;
import lk.ac.kln.unimart.listing.repository.ListingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class ListingService {

    private final ListingRepository listingRepository;
    private final UserRepository userRepository;

    public ListingService(ListingRepository listingRepository, UserRepository userRepository) {
        this.listingRepository = listingRepository;
        this.userRepository = userRepository;
    }

    public Page<ListingResponseDto> getAllListings(Pageable pageable) {
        return listingRepository.findAll(pageable).map(this::mapToDto);
    }

    public ListingResponseDto getListingById(String id) {
        ListingEntity entity = listingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Listing not found with id: " + id));
        return mapToDto(entity);
    }

    @Transactional
    public ListingResponseDto createListing(ListingCreateDto dto, String sellerEmail) {
        UserEntity seller = userRepository.findByEmail(sellerEmail)
                .orElseThrow(() -> new IllegalArgumentException("Seller user not found"));

        String generatedSku = "UM-" + dto.getCategory().substring(0, Math.min(4, dto.getCategory().length())).toUpperCase() + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();

        ListingEntity entity = ListingEntity.builder()
                .sku(generatedSku)
                .title(dto.getTitle())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .originalPrice(dto.getOriginalPrice())
                .category(dto.getCategory())
                .condition(dto.getCondition())
                .imageUrl(dto.getImageUrl() != null ? dto.getImageUrl() : "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80")
                .seller(seller)
                .campusLocation(dto.getCampusLocation() != null ? dto.getCampusLocation() : "Main Library")
                .campusZone(dto.getCampusZone() != null ? dto.getCampusZone() : "Main Library")
                .isHotDeal(dto.getIsHotDeal() != null ? dto.getIsHotDeal() : false)
                .bundleItems(dto.getBundleItems())
                .stock(dto.getStock() != null ? dto.getStock() : 1)
                .build();

        ListingEntity saved = listingRepository.save(entity);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteListing(String id, String sellerEmail) {
        ListingEntity entity = listingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Listing not found with id: " + id));

        if (!entity.getSeller().getEmail().equals(sellerEmail)) {
            throw new IllegalArgumentException("You are not authorized to delete this listing.");
        }

        listingRepository.delete(entity);
    }

    public ListingResponseDto mapToDto(ListingEntity entity) {
        UserDto sellerDto = null;
        if (entity.getSeller() != null) {
            sellerDto = UserDto.builder()
                    .id(entity.getSeller().getId())
                    .name(entity.getSeller().getName())
                    .email(entity.getSeller().getEmail())
                    .studentId(entity.getSeller().getStudentId())
                    .campusLocation(entity.getSeller().getCampusLocation())
                    .avatar(entity.getSeller().getAvatar())
                    .verifiedStudent(entity.getSeller().isVerifiedStudent())
                    .role(entity.getSeller().getRole().name())
                    .build();
        }

        return ListingResponseDto.builder()
                .id(entity.getId())
                .sku(entity.getSku())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .price(entity.getPrice())
                .originalPrice(entity.getOriginalPrice())
                .category(entity.getCategory())
                .condition(entity.getCondition())
                .imageUrl(entity.getImageUrl())
                .seller(sellerDto)
                .campusLocation(entity.getCampusLocation())
                .campusZone(entity.getCampusZone())
                .isHotDeal(entity.getIsHotDeal())
                .bundleItems(entity.getBundleItems())
                .stock(entity.getStock())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
