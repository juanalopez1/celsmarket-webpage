package celsmarket.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import celsmarket.backend.entities.Cellphone;

@Repository
public interface CellphoneRepository extends CrudRepository<Cellphone, Integer> {

    @Query("select c from Cellphone c where c.shown = true")
    List<Cellphone> findShown();

    @Query("""
                SELECT c FROM Cellphone c
                WHERE c.shown = true
                  AND (:brand IS NULL OR c.brand.name = :brand)
                  AND (:color IS NULL OR c.color.name = :color)
                  AND (:condition IS NULL OR c.condition.name = :condition)
                  AND (:model IS NULL OR c.model.name = :model)
                  AND (:storage IS NULL OR c.storage.number = :storage)
            """)
    List<Cellphone> filterAll(
            @Param("brand") String brand,
            @Param("color") String color,
            @Param("condition") String condition,
            @Param("model") String model,
            @Param("storage") String storage);


}
