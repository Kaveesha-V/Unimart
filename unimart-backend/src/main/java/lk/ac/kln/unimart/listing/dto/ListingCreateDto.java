package lk.ac.kln.unimart.listing.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class ListingCreateDto {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price cannot be negative")
    private Double price;

    private Double originalPrice;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Condition is required")
    private String condition;

    private String imageUrl;
    private String campusLocation;
    private String campusZone;
    private Boolean isHotDeal;
    private List<String> bundleItems;
    private Integer stock = 1;

    public ListingCreateDto() {
    }

    public ListingCreateDto(String title, String description, Double price, Double originalPrice, String category, String condition, String imageUrl, String campusLocation, String campusZone, Boolean isHotDeal, List<String> bundleItems, Integer stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.originalPrice = originalPrice;
        this.category = category;
        this.condition = condition;
        this.imageUrl = imageUrl;
        this.campusLocation = campusLocation;
        this.campusZone = campusZone;
        this.isHotDeal = isHotDeal;
        this.bundleItems = bundleItems;
        this.stock = stock != null ? stock : 1;
    }

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
}
