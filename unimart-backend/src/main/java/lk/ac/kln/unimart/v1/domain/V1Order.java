package lk.ac.kln.unimart.v1.domain;

import jakarta.persistence.*;
import lk.ac.kln.unimart.auth.entity.UserEntity;

import java.time.Instant;

@Entity
@Table(name = "v1_orders")
public class V1Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "buyer_id", nullable = false)
    private UserEntity buyer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "listing_id", nullable = false)
    private V1Listing listing;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private V1OrderStatus status = V1OrderStatus.PENDING;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public V1Order() {
    }

    public V1Order(String id, UserEntity buyer, V1Listing listing, V1OrderStatus status) {
        this.id = id;
        this.buyer = buyer;
        this.listing = listing;
        this.status = status != null ? status : V1OrderStatus.PENDING;
        this.createdAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public UserEntity getBuyer() { return buyer; }
    public void setBuyer(UserEntity buyer) { this.buyer = buyer; }
    public V1Listing getListing() { return listing; }
    public void setListing(V1Listing listing) { this.listing = listing; }
    public V1OrderStatus getStatus() { return status; }
    public void setStatus(V1OrderStatus status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
