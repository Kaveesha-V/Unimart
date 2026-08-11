package lk.ac.kln.unimart.v1.service;

import lk.ac.kln.unimart.auth.entity.Role;
import lk.ac.kln.unimart.auth.entity.UserEntity;
import lk.ac.kln.unimart.auth.repository.UserRepository;
import lk.ac.kln.unimart.v1.domain.V1Order;
import lk.ac.kln.unimart.v1.domain.V1OrderStatus;
import lk.ac.kln.unimart.v1.domain.V1Review;
import lk.ac.kln.unimart.v1.dto.PagedResponse;
import lk.ac.kln.unimart.v1.dto.ReviewCreateRequest;
import lk.ac.kln.unimart.v1.dto.ReviewResponse;
import lk.ac.kln.unimart.v1.dto.ReviewUpdateRequest;
import lk.ac.kln.unimart.v1.exception.ConflictException;
import lk.ac.kln.unimart.v1.exception.ForbiddenException;
import lk.ac.kln.unimart.v1.exception.ResourceNotFoundException;
import lk.ac.kln.unimart.v1.repository.V1OrderRepository;
import lk.ac.kln.unimart.v1.repository.V1ReviewRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class V1ReviewService {

    private final V1ReviewRepository reviewRepository;
    private final V1OrderRepository orderRepository;
    private final UserRepository userRepository;

    public V1ReviewService(V1ReviewRepository reviewRepository,
                           V1OrderRepository orderRepository,
                           UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ReviewResponse createReview(ReviewCreateRequest request, String userEmail) {
        // 1. Order must exist (404 if not)
        V1Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + request.getOrderId()));

        // 2. Order status must be COMPLETED (409 if not)
        if (order.getStatus() != V1OrderStatus.COMPLETED) {
            throw new ConflictException("Cannot review an order that is not COMPLETED (Current status: " + order.getStatus() + ")");
        }

        // 3. Only the order's buyer can create the review (403 if not)
        if (!order.getBuyer().getEmail().equalsIgnoreCase(userEmail)) {
            throw new ForbiddenException("Only the buyer of this order can submit a review");
        }

        // 4. Only one review per order — reject with 409 if one already exists
        reviewRepository.findByOrderId(order.getId()).ifPresent(existing -> {
            throw new ConflictException("A review has already been submitted for this order");
        });

        // 5. reviewee is derived from order's listing seller
        UserEntity reviewee = order.getListing().getSeller();
        UserEntity reviewer = order.getBuyer();

        V1Review review = new V1Review();
        review.setOrder(order);
        review.setReviewer(reviewer);
        review.setReviewee(reviewee);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        V1Review saved = reviewRepository.save(review);
        return new ReviewResponse(saved);
    }

    @Transactional(readOnly = true)
    public PagedResponse<ReviewResponse> getReviewsForListing(String listingId, int page, int size) {
        int cappedSize = Math.min(Math.max(size, 1), 50);
        Pageable pageable = PageRequest.of(Math.max(page, 0), cappedSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<V1Review> reviewPage = reviewRepository.findByOrderListingId(listingId, pageable);
        List<ReviewResponse> content = reviewPage.getContent().stream()
                .map(ReviewResponse::new)
                .toList();

        return new PagedResponse<>(content, reviewPage);
    }

    @Transactional
    public ReviewResponse updateReview(String id, ReviewUpdateRequest request, String userEmail) {
        V1Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with ID: " + id));

        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        boolean isAuthor = review.getReviewer().getEmail().equalsIgnoreCase(userEmail);
        boolean isAdmin = user.getRole() == Role.ROLE_ADMIN;

        if (!isAuthor && !isAdmin) {
            throw new ForbiddenException("You do not have permission to update this review");
        }

        review.setRating(request.getRating());
        review.setComment(request.getComment());

        V1Review updated = reviewRepository.save(review);
        return new ReviewResponse(updated);
    }

    @Transactional
    public void deleteReview(String id, String userEmail) {
        V1Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with ID: " + id));

        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        boolean isAuthor = review.getReviewer().getEmail().equalsIgnoreCase(userEmail);
        boolean isAdmin = user.getRole() == Role.ROLE_ADMIN;

        if (!isAuthor && !isAdmin) {
            throw new ForbiddenException("You do not have permission to delete this review");
        }

        reviewRepository.delete(review);
    }
}
