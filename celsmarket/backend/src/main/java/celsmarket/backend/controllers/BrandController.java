package celsmarket.backend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

import celsmarket.backend.entities.Brand;
import celsmarket.backend.repositories.BrandRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/brands")
public class BrandController {

    @Autowired
    private BrandRepository brandRepository;

    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(e -> {
            errors.put(e.getField(), "El campo " + e.getField() + " " + e.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);

    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Brand brand, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(brandRepository.save(brand));
    }

    @GetMapping
    public List<Brand> listAll() {
        return (List<Brand>) brandRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> view(@PathVariable Integer id) {
        Optional<Brand> brandOptional = brandRepository.findById(id);
        if (brandOptional.isPresent()) {
            return ResponseEntity.ok(brandOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Brand> brandOptional = brandRepository.findById(id);
        if (brandOptional.isPresent()) {
            brandRepository.delete(brandOptional.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

}
