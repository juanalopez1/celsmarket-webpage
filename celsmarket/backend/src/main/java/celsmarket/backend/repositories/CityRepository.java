package celsmarket.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import celsmarket.backend.entities.City;

@Repository
public interface CityRepository extends CrudRepository<City,Integer>{
    
}
