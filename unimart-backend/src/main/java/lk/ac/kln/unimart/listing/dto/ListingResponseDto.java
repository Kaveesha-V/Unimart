package lk.ac.kln.unimart.listing.dto;

import lk.ac.kln.unimart.auth.dto.UserDto;

import java.time.Instant;
import java.util.List;

public class ListingResponseDto {
    private String id;
    private String sku;
    private String title;
    private String description;
    private Double price;
    private Double originalPrice;
    private String category;
    private String condition;
    private String imageUrl;
    private UserDto seller;
    private String campusLocation;
    private String campusZone;
    private Boolean isHotDeal;
    private List<String> bundleItems;
    private Integer stock;
    private Instant createdAt;

    public ListingResponseDto() {
    }

    public ListingResponseDto(String id, String sku, String title, String description, Double price, Double originalPrice, String category, String condition, String imageUrl, UserDto seller, String campusLocation, String campusZone, Boolean isHotDeal, List<String> bundleItems, Integer stock, Instant createdAt) {
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
        this.isHotDeal = isHotDeal;
        this.bundleItems = bundleItems;
        this.stock = stock;
        this.createdAt = createdAt;
    }

    public static ListingResponseDtoBuilder builder() {
        return new ListingResponseDtoBuilder();
    }

    public static class ListingResponseDtoBuilder {
        private String id;
        private String sku;
        private String title;
        private String description;
        private Double price;
        private Double originalPrice;
        private String category;
        private String condition;
        private String imageUrl;
        private UserDto seller;
        private String campusLocation;
        private String campusZone;
        private Boolean isHotDeal;
        private List<String> bundleItems;
        private Integer stock;
        private Instant createdAt;

        public ListingResponseDtoBuilder id(String id) { this.id = id; return this; }
        public ListingResponseDtoBuilder sku(String sku) { this.sku = sku; return this; }
        public ListingResponseDtoBuilder title(String title) { this.title = title; return this; }
        public ListingResponseDtoBuilder description(String description) { this.description = description; return this; }
        public ListingResponseDtoBuilder price(Double price) { this.price = price; return this; }
        public ListingResponseDtoBuilder originalPrice(Double originalPrice) { this.originalPrice = originalPrice; return this; }
        public ListingResponseDtoBuilder category(String category) { this.category = category; return this; }
        public ListingResponseDtoBuilder condition(String condition) { this.condition = condition; return this; }
        public ListingResponseDtoBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public ListingResponseDtoBuilder seller(UserDto seller) { this.seller = seller; return this; }
        public ListingResponseDtoBuilder campusLocation(String campusLocation) { this.campusLocation = campusLocation; return this; }
        public ListingResponseDtoBuilder campusZone(String campusZone) { this.campusZone = campusZone; return this; }
        public ListingResponseDtoBuilder isHotDeal(Boolean isHotDeal) { this.isHotDeal = isHotDeal; return this; }
        public ListingResponseDtoBuilder bundleItems(List<String> bundleItems) { this.bundleItems = bundleItems; return this; }
        public ListingResponseDtoBuilder stock(Integer stock) { this.stock = stock; return this; }
        public ListingResponseDtoBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public ListingResponseDto build() {
            return new ListingResponseDto(id, sku, title, description, price, originalPrice, category, condition, imageUrl, seller, campusLocation, campusZone, isHotDeal, bundleItems, stock, createdAt);
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
    public UserDto getSeller() { return seller; }
    public void setSeller(UserDto seller) { this.seller = seller; }
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
