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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import celsmarket.backend.entities.Brand;
import celsmarket.backend.services.IBrandService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/brands")
public class BrandController {

    @Autowired
    private IBrandService brandService;

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
        return ResponseEntity.status(HttpStatus.CREATED).body(brandService.save(brand));
    }

    @PutMapping("/{id}") // poner el binding a la derecha de lo que vamos a validar
    public ResponseEntity<?> update(@Valid @RequestBody Brand brand, BindingResult result,
            @PathVariable Integer id) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }
        Optional<Brand> brandOptional = brandService.update(id, brand);
        if (brandOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(brandOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();

    }

    @GetMapping
    public List<Brand> listAll() {
        return (List<Brand>) brandService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> view(@PathVariable Integer id) {
        Optional<Brand> brandOptional = brandService.findOne(id);
        if (brandOptional.isPresent()) {
            return ResponseEntity.ok(brandOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Brand> brandOptional = brandService.findOne(id);
        if (brandOptional.isPresent()) {
            brandService.delete(brandOptional.get().getId());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

}
