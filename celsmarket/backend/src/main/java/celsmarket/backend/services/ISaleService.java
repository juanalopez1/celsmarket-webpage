package celsmarket.backend.services;

import java.util.List;
import java.util.Optional;

import celsmarket.backend.entities.Sale;

public interface ISaleService {
    Sale save(Sale sale);

    List<Sale> findAll();

    Optional<Sale> findOne(Integer id);

    void delete(Integer id);

    Optional<Sale> update(Integer id, Sale body);
}
