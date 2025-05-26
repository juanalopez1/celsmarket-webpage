package celsmarket.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import celsmarket.backend.entities.Currency;

@Repository
public interface CurrencyRepository extends CrudRepository<Currency, Integer> {
    
}
