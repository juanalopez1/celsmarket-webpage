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

import celsmarket.backend.entities.Color;
import celsmarket.backend.repositories.ColorRepository;
import celsmarket.backend.services.ValidationService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/colors")
public class ColorController {
    
    @Autowired
    private ColorRepository colorRepository;

    @Autowired
    private ValidationService validator;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Color color, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validator.validate(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(colorRepository.save(color));
    }

    @GetMapping
    public List<Color> listAll() {
        return (List<Color>) colorRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> view(@PathVariable Integer id) {
        Optional<Color> colorOptional = colorRepository.findById(id);
        if (colorOptional.isPresent()) {
            return ResponseEntity.ok(colorOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Color> colorOptional = colorRepository.findById(id);
        if (colorOptional.isPresent()) {
            colorRepository.delete(colorOptional.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
