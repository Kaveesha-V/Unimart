package lk.ac.kln.unimart.v1.repository;

import lk.ac.kln.unimart.v1.domain.V1Listing;
import lk.ac.kln.unimart.v1.domain.V1ListingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface V1ListingRepository extends JpaRepository<V1Listing, String> {

    @Query("SELECT l FROM V1Listing l WHERE " +
           "(:status IS NULL OR l.status = :status) AND " +
           "(:categoryId IS NULL OR l.category.id = :categoryId) AND " +
           "(:query IS NULL OR LOWER(l.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(l.description) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<V1Listing> findFilteredListings(
            @Param("query") String query,
            @Param("categoryId") Long categoryId,
            @Param("status") V1ListingStatus status,
            Pageable pageable
    );
}
