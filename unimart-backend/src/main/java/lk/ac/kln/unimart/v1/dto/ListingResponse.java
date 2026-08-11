package lk.ac.kln.unimart.v1.dto;

import lk.ac.kln.unimart.v1.domain.V1Listing;
import lk.ac.kln.unimart.v1.domain.V1ListingStatus;

import java.math.BigDecimal;
import java.time.Instant;

public class ListingResponse {

    private String id;
    private String title;
    private String description;
    private BigDecimal price;
    private V1ListingStatus status;
    private Long categoryId;
    private String categoryName;
    private String sellerId;
    private String sellerEmail;
    private String sellerName;
    private Long version;
    private Instant createdAt;
    private Instant updatedAt;

    public ListingResponse() {
    }

    public ListingResponse(V1Listing listing) {
        this.id = listing.getId();
        this.title = listing.getTitle();
        this.description = listing.getDescription();
        this.price = listing.getPrice();
        this.status = listing.getStatus();
        if (listing.getCategory() != null) {
            this.categoryId = listing.getCategory().getId();
            this.categoryName = listing.getCategory().getName();
        }
        if (listing.getSeller() != null) {
            this.sellerId = listing.getSeller().getId();
            this.sellerEmail = listing.getSeller().getEmail();
            this.sellerName = listing.getSeller().getName();
        }
        this.version = listing.getVersion();
        this.createdAt = listing.getCreatedAt();
        this.updatedAt = listing.getUpdatedAt();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public V1ListingStatus getStatus() { return status; }
    public void setStatus(V1ListingStatus status) { this.status = status; }
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    public String getSellerId() { return sellerId; }
    public void setSellerId(String sellerId) { this.sellerId = sellerId; }
    public String getSellerEmail() { return sellerEmail; }
    public void setSellerEmail(String sellerEmail) { this.sellerEmail = sellerEmail; }
    public String getSellerName() { return sellerName; }
    public void setSellerName(String sellerName) { this.sellerName = sellerName; }
    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
