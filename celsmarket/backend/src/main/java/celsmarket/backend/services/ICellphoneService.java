package celsmarket.backend.services;

import java.util.List;
import java.util.Optional;

import celsmarket.backend.entities.Cellphone;

public interface ICellphoneService {
    Cellphone save(Cellphone cellphone);

    List<Cellphone> findAll();

    List<Cellphone> findAllShownCellphones();

    Optional<Cellphone> findOne(Integer id);

    void delete(Integer id);

    Optional<Cellphone> update(Integer id, Cellphone body);

}
