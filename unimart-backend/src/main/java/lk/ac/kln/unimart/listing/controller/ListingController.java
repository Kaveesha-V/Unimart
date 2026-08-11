package lk.ac.kln.unimart.listing.controller;

import jakarta.validation.Valid;
import lk.ac.kln.unimart.listing.dto.ListingCreateDto;
import lk.ac.kln.unimart.listing.dto.ListingResponseDto;
import lk.ac.kln.unimart.listing.service.ListingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/listings")
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @GetMapping
    public ResponseEntity<Page<ListingResponseDto>> getAllListings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(listingService.getAllListings(pageRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingResponseDto> getListingById(@PathVariable String id) {
        return ResponseEntity.ok(listingService.getListingById(id));
    }

    @PostMapping
    public ResponseEntity<ListingResponseDto> createListing(
            @Valid @RequestBody ListingCreateDto dto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(listingService.createListing(dto, userDetails.getUsername()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteListing(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        listingService.deleteListing(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
