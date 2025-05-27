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

import celsmarket.backend.entities.Model;
import celsmarket.backend.repositories.ModelRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/models")
public class ModelController {

    @Autowired
    private ModelRepository modelRepository;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Model model, BindingResult result) {
        return ResponseEntity.status(HttpStatus.CREATED).body(modelRepository.save(model));
    }

    @GetMapping
    public List<Model> listAll() {
        return (List<Model>) modelRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> view(@PathVariable Integer id) {
        Optional<Model> modelOptional = modelRepository.findById(id);
        if (modelOptional.isPresent()) {
            return ResponseEntity.ok(modelOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Model> modelOptional = modelRepository.findById(id);
        if (modelOptional.isPresent()) {
            modelRepository.delete(modelOptional.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
