package lk.ac.kln.unimart.v1.repository;

import lk.ac.kln.unimart.v1.domain.V1Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface V1OrderRepository extends JpaRepository<V1Order, String> {
    List<V1Order> findByBuyerId(String buyerId);
    List<V1Order> findByListingId(String listingId);
}
