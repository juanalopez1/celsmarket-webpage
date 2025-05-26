package celsmarket.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import celsmarket.backend.entities.Model;

@Repository
public interface ModelRepository extends CrudRepository<Model, Integer> {
    
}
