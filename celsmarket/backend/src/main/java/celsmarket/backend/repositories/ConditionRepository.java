package celsmarket.backend.repositories;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import celsmarket.backend.entities.Condition;

@Repository
public interface ConditionRepository extends CrudRepository<Condition, Integer>{
    
}
