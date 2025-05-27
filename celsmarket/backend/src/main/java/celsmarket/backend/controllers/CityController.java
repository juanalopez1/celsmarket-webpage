package celsmarket.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import celsmarket.backend.entities.City;
import celsmarket.backend.repositories.CityRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/cities")
public class CityController {

    @Autowired
    private CityRepository cityRepository;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody City city, BindingResult result) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cityRepository.save(city));
    }

    @GetMapping
    public List<City> listAll() {
        return (List<City>) cityRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> view(@PathVariable Integer id) {
        Optional<City> cityOptional = cityRepository.findById(id);
        if (cityOptional.isPresent()) {
            return ResponseEntity.ok(cityOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<City> cityOptional = cityRepository.findById(id);
        if (cityOptional.isPresent()) {
            cityRepository.delete(cityOptional.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
