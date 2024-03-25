package jpi.supplyfellow.productservice.repository;

import jpi.supplyfellow.productservice.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
