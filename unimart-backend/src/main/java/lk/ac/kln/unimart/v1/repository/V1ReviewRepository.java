package lk.ac.kln.unimart.v1.repository;

import lk.ac.kln.unimart.v1.domain.V1Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface V1ReviewRepository extends JpaRepository<V1Review, String> {

    Optional<V1Review> findByOrderId(String orderId);

    @Query("SELECT r FROM V1Review r WHERE r.order.listing.id = :listingId OR r.reviewee.id = :sellerId")
    Page<V1Review> findReviewsForListingOrSeller(
            @Param("listingId") String listingId,
            @Param("sellerId") String sellerId,
            Pageable pageable
    );

    Page<V1Review> findByOrderListingId(String listingId, Pageable pageable);
}
