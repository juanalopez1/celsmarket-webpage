package celsmarket.backend.services;

import java.util.List;
import java.util.Optional;

import celsmarket.backend.entities.Brand;

public interface IBrandService {
    List<Brand> findAll();

    Brand save(Brand brand);

    Optional<Brand> findOne(Integer id);

    void delete(Integer id);

    Optional<Brand> update(Integer id, Brand body);
}
