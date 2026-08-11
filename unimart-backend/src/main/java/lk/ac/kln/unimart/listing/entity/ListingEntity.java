package lk.ac.kln.unimart.listing.entity;

import jakarta.persistence.*;
import lk.ac.kln.unimart.auth.entity.UserEntity;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "listings")
public class ListingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private Double price;

    private Double originalPrice;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String condition;

    private String imageUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seller_id")
    private UserEntity seller;

    private String campusLocation;
    private String campusZone;
    private Boolean isHotDeal = false;

    @ElementCollection
    @CollectionTable(name = "listing_bundle_items", joinColumns = @JoinColumn(name = "listing_id"))
    @Column(name = "item")
    private List<String> bundleItems;

    private Integer stock = 1;
    private Instant createdAt = Instant.now();

    public ListingEntity() {
    }

    public ListingEntity(String id, String sku, String title, String description, Double price, Double originalPrice, String category, String condition, String imageUrl, UserEntity seller, String campusLocation, String campusZone, Boolean isHotDeal, List<String> bundleItems, Integer stock, Instant createdAt) {
        this.id = id;
        this.sku = sku;
        this.title = title;
        this.description = description;
        this.price = price;
        this.originalPrice = originalPrice;
        this.category = category;
        this.condition = condition;
        this.imageUrl = imageUrl;
        this.seller = seller;
        this.campusLocation = campusLocation;
        this.campusZone = campusZone;
        this.isHotDeal = isHotDeal != null ? isHotDeal : false;
        this.bundleItems = bundleItems;
        this.stock = stock != null ? stock : 1;
        this.createdAt = createdAt != null ? createdAt : Instant.now();
    }

    public static ListingEntityBuilder builder() {
        return new ListingEntityBuilder();
    }

    public static class ListingEntityBuilder {
        private String id;
        private String sku;
        private String title;
        private String description;
        private Double price;
        private Double originalPrice;
        private String category;
        private String condition;
        private String imageUrl;
        private UserEntity seller;
        private String campusLocation;
        private String campusZone;
        private Boolean isHotDeal = false;
        private List<String> bundleItems;
        private Integer stock = 1;
        private Instant createdAt = Instant.now();

        public ListingEntityBuilder id(String id) { this.id = id; return this; }
        public ListingEntityBuilder sku(String sku) { this.sku = sku; return this; }
        public ListingEntityBuilder title(String title) { this.title = title; return this; }
        public ListingEntityBuilder description(String description) { this.description = description; return this; }
        public ListingEntityBuilder price(Double price) { this.price = price; return this; }
        public ListingEntityBuilder originalPrice(Double originalPrice) { this.originalPrice = originalPrice; return this; }
        public ListingEntityBuilder category(String category) { this.category = category; return this; }
        public ListingEntityBuilder condition(String condition) { this.condition = condition; return this; }
        public ListingEntityBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public ListingEntityBuilder seller(UserEntity seller) { this.seller = seller; return this; }
        public ListingEntityBuilder campusLocation(String campusLocation) { this.campusLocation = campusLocation; return this; }
        public ListingEntityBuilder campusZone(String campusZone) { this.campusZone = campusZone; return this; }
        public ListingEntityBuilder isHotDeal(Boolean isHotDeal) { this.isHotDeal = isHotDeal; return this; }
        public ListingEntityBuilder bundleItems(List<String> bundleItems) { this.bundleItems = bundleItems; return this; }
        public ListingEntityBuilder stock(Integer stock) { this.stock = stock; return this; }
        public ListingEntityBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public ListingEntity build() {
            return new ListingEntity(id, sku, title, description, price, originalPrice, category, condition, imageUrl, seller, campusLocation, campusZone, isHotDeal, bundleItems, stock, createdAt);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Double getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(Double originalPrice) { this.originalPrice = originalPrice; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public UserEntity getSeller() { return seller; }
    public void setSeller(UserEntity seller) { this.seller = seller; }
    public String getCampusLocation() { return campusLocation; }
    public void setCampusLocation(String campusLocation) { this.campusLocation = campusLocation; }
    public String getCampusZone() { return campusZone; }
    public void setCampusZone(String campusZone) { this.campusZone = campusZone; }
    public Boolean getIsHotDeal() { return isHotDeal; }
    public void setIsHotDeal(Boolean isHotDeal) { this.isHotDeal = isHotDeal; }
    public List<String> getBundleItems() { return bundleItems; }
    public void setBundleItems(List<String> bundleItems) { this.bundleItems = bundleItems; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
