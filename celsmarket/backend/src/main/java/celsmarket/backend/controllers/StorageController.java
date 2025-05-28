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

import celsmarket.backend.entities.Storage;
import celsmarket.backend.repositories.StorageRepository;
import celsmarket.backend.services.ValidationService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/storages")
public class StorageController {

    @Autowired
    private StorageRepository storageRepository;

    @Autowired
    private ValidationService validator;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Storage storage, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validator.validate(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(storageRepository.save(storage));
    }

    @GetMapping
    public List<Storage> listAll() {
        return (List<Storage>) storageRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> view(@PathVariable Integer id) {
        Optional<Storage> storageOptional = storageRepository.findById(id);
        if (storageOptional.isPresent()) {
            return ResponseEntity.ok(storageOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Storage> storageOptional = storageRepository.findById(id);
        if (storageOptional.isPresent()) {
            storageRepository.delete(storageOptional.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
