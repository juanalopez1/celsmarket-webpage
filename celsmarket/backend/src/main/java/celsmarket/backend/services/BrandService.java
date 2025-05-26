package celsmarket.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import celsmarket.backend.entities.Brand;
import celsmarket.backend.repositories.BrandRepository;

@Service
public class BrandService implements IBrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<Brand> findAll() {
        return (List<Brand>) brandRepository.findAll();
    }

    @Override
    public Brand save(Brand brand) {
        return brandRepository.save(brand);
    }

    @Override
    public Optional<Brand> findOne(Integer id) {
        return brandRepository.findById(id);
    }

    @Override
    public void delete(Integer id) {
        brandRepository.deleteById(id);
    }

    @Override
    public Optional<Brand> update(Integer id, Brand body) {
        Optional<Brand> brandOptional = brandRepository.findById(id);
        if (brandOptional.isPresent()) {
            Brand brand = brandOptional.orElseThrow();
            brand.setName(body.getName());
            return Optional.of(brandRepository.save(brand));
        }
        return brandOptional;
    }

}
