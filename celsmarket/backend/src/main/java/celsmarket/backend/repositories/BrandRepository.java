package celsmarket.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import celsmarket.backend.entities.Brand;

@Repository
public interface BrandRepository extends CrudRepository<Brand, Integer> {

}
