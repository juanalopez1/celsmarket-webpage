package celsmarket.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import celsmarket.backend.entities.Color;

@Repository
public interface ColorRepository extends CrudRepository<Color, Integer>{
    
}
