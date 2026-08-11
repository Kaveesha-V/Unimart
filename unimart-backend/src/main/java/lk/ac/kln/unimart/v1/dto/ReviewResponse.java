package lk.ac.kln.unimart.v1.dto;

import lk.ac.kln.unimart.v1.domain.V1Review;

import java.time.Instant;

public class ReviewResponse {

    private String id;
    private String orderId;
    private String listingId;
    private String reviewerId;
    private String reviewerName;
    private String revieweeId;
    private String revieweeName;
    private Integer rating;
    private String comment;
    private Instant createdAt;
    private Instant updatedAt;

    public ReviewResponse() {
    }

    public ReviewResponse(V1Review review) {
        this.id = review.getId();
        if (review.getOrder() != null) {
            this.orderId = review.getOrder().getId();
            if (review.getOrder().getListing() != null) {
                this.listingId = review.getOrder().getListing().getId();
            }
        }
        if (review.getReviewer() != null) {
            this.reviewerId = review.getReviewer().getId();
            this.reviewerName = review.getReviewer().getName();
        }
        if (review.getReviewee() != null) {
            this.revieweeId = review.getReviewee().getId();
            this.revieweeName = review.getReviewee().getName();
        }
        this.rating = review.getRating();
        this.comment = review.getComment();
        this.createdAt = review.getCreatedAt();
        this.updatedAt = review.getUpdatedAt();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public String getListingId() { return listingId; }
    public void setListingId(String listingId) { this.listingId = listingId; }
    public String getReviewerId() { return reviewerId; }
    public void setReviewerId(String reviewerId) { this.reviewerId = reviewerId; }
    public String getReviewerName() { return reviewerName; }
    public void setReviewerName(String reviewerName) { this.reviewerName = reviewerName; }
    public String getRevieweeId() { return revieweeId; }
    public void setRevieweeId(String revieweeId) { this.revieweeId = revieweeId; }
    public String getRevieweeName() { return revieweeName; }
    public void setRevieweeName(String revieweeName) { this.revieweeName = revieweeName; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
