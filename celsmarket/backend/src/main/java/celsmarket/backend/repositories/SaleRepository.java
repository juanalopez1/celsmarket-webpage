package celsmarket.backend.repositories;

import org.springframework.data.repository.CrudRepository;

import celsmarket.backend.entities.Sale;

public interface SaleRepository extends CrudRepository<Sale, Integer>{
    
}
