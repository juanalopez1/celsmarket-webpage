package celsmarket.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import celsmarket.backend.entities.Sale;
import celsmarket.backend.repositories.SaleRepository;

@Service
public class SaleService implements ISaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Override
    public Sale save(Sale sale) {
        return saleRepository.save(sale);
    }

    @Override
    public List<Sale> findAll() {
        return (List<Sale>) saleRepository.findAll();
    }

    @Override
    public Optional<Sale> findOne(Integer id) {
        return saleRepository.findById(id);
    }

    @Override
    public void delete(Integer id) {
        saleRepository.deleteById(id);
        return;
    }

    @Override
    public Optional<Sale> update(Integer id, Sale body) {
        Optional<Sale> saleToUpdate = saleRepository.findById(id);
        if(saleToUpdate.isPresent()){
            Sale sale = saleToUpdate.orElseThrow();
            sale.setAddress(body.getAddress());
            sale.setAmount(body.getAmount());
            sale.setCity(body.getCity());
            sale.setCurrency(body.getCurrency());
            sale.setCellphone(body.getCellphone());
            sale.setClient(body.getClient());
            sale.setDate_hour(body.getDate_hour());
            return Optional.of(saleRepository.save(sale));
        }
        return saleToUpdate;
    }
    
}
