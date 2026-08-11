package lk.ac.kln.unimart.listing.repository;

import lk.ac.kln.unimart.listing.entity.ListingEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListingRepository extends JpaRepository<ListingEntity, String> {
    Page<ListingEntity> findByCategory(String category, Pageable pageable);
    Page<ListingEntity> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description, Pageable pageable);
}
