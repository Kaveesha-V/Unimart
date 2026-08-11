package lk.ac.kln.unimart.v1.domain;

import jakarta.persistence.*;
import lk.ac.kln.unimart.auth.entity.UserEntity;

import java.time.Instant;

@Entity
@Table(name = "v1_reviews", uniqueConstraints = {
    @UniqueConstraint(name = "uk_v1_reviews_order_id", columnNames = {"order_id"})
})
public class V1Review {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private V1Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "reviewer_id", nullable = false)
    private UserEntity reviewer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "reviewee_id", nullable = false)
    private UserEntity reviewee;

    @Column(nullable = false)
    private Integer rating;

    @Column(length = 1000)
    private String comment;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(nullable = false)
    private Instant updatedAt = Instant.now();

    public V1Review() {
    }

    public V1Review(String id, V1Order order, UserEntity reviewer, UserEntity reviewee, Integer rating, String comment) {
        this.id = id;
        this.order = order;
        this.reviewer = reviewer;
        this.reviewee = reviewee;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public V1Order getOrder() { return order; }
    public void setOrder(V1Order order) { this.order = order; }
    public UserEntity getReviewer() { return reviewer; }
    public void setReviewer(UserEntity reviewer) { this.reviewer = reviewer; }
    public UserEntity getReviewee() { return reviewee; }
    public void setReviewee(UserEntity reviewee) { this.reviewee = reviewee; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
