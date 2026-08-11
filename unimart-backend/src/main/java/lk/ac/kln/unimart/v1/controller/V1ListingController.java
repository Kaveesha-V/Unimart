package lk.ac.kln.unimart.v1.controller;

import jakarta.validation.Valid;
import lk.ac.kln.unimart.v1.domain.V1ListingStatus;
import lk.ac.kln.unimart.v1.dto.ListingRequest;
import lk.ac.kln.unimart.v1.dto.ListingResponse;
import lk.ac.kln.unimart.v1.dto.PagedResponse;
import lk.ac.kln.unimart.v1.dto.ReviewResponse;
import lk.ac.kln.unimart.v1.service.V1ListingService;
import lk.ac.kln.unimart.v1.service.V1ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/listings")
public class V1ListingController {

    private final V1ListingService listingService;
    private final V1ReviewService reviewService;

    public V1ListingController(V1ListingService listingService, V1ReviewService reviewService) {
        this.listingService = listingService;
        this.reviewService = reviewService;
    }

    @GetMapping
    public ResponseEntity<PagedResponse<ListingResponse>> getListings(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) V1ListingStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PagedResponse<ListingResponse> response = listingService.getListings(q, categoryId, status, page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingResponse> getListingById(@PathVariable String id) {
        ListingResponse response = listingService.getListingById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ListingResponse> createListing(
            @Valid @RequestBody ListingRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        ListingResponse response = listingService.createListing(request, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListingResponse> updateListing(
            @PathVariable String id,
            @Valid @RequestBody ListingRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        ListingResponse response = listingService.updateListing(id, request, userDetails.getUsername());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteListing(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        listingService.deleteListing(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<PagedResponse<ReviewResponse>> getListingReviews(
            @PathVariable String id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PagedResponse<ReviewResponse> response = reviewService.getReviewsForListing(id, page, size);
        return ResponseEntity.ok(response);
    }
}
