package celsmarket.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import celsmarket.backend.entities.Cellphone;
import celsmarket.backend.repositories.CellphoneRepository;

@Service
public class CellphoneService implements ICellphoneService {

    @Autowired
    private CellphoneRepository cellphoneRepository;

    @Override
    public Cellphone save(Cellphone cellphone) {
        return cellphoneRepository.save(cellphone);
    }
    
    @Override // solo para za
    public List<Cellphone> findAll() {
        return (List<Cellphone>) cellphoneRepository.findAll();
    }

    @Override
    public Optional<Cellphone> findOne(Integer id) {
        return cellphoneRepository.findById(id);
    }

    @Override
    public void delete(Integer id) {
        cellphoneRepository.deleteById(id);
        return;
    } // agregar exepcion

    @Override
    public Optional<Cellphone> update(Integer id, Cellphone body) {
        Optional<Cellphone> cellphoneToUpdate = cellphoneRepository.findById(id);
        if (cellphoneToUpdate.isPresent()) {
            Cellphone cellphone = cellphoneToUpdate.orElseThrow();
            cellphone.setBatteryCondition(body.getBatteryCondition());
            cellphone.setBrand(body.getBrand());
            cellphone.setColor(body.getColor());
            cellphone.setCondition(body.getCondition());
            cellphone.setDescription(body.getDescription());
            cellphone.setModel(body.getModel());
            cellphone.setPrice(body.getPrice());
            cellphone.setStock(body.getStock());
            cellphone.setStorage(body.getStorage());
            cellphone.setShown(body.isShown());
            return Optional.of(cellphoneRepository.save(cellphone));
        }
        ;
        return cellphoneToUpdate;
    }

    @Override
    public List<Cellphone> findAllShownCellphones() {
        return cellphoneRepository.findShown();
    }

}
