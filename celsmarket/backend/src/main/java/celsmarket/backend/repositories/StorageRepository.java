package celsmarket.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import celsmarket.backend.entities.Storage;

@Repository
public interface StorageRepository extends CrudRepository<Storage, Integer> {
    
}
