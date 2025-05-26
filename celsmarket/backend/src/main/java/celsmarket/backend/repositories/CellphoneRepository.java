package celsmarket.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import celsmarket.backend.entities.Cellphone;

@Repository
public interface CellphoneRepository extends CrudRepository<Cellphone, Integer>{
    
    @Query("select c from Cellphone c where c.shown = true")
    List<Cellphone> findShown();
}
