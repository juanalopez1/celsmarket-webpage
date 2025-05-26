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

import celsmarket.backend.entities.Cellphone;
import celsmarket.backend.entities.Sale;
import celsmarket.backend.services.CellphoneService;
import celsmarket.backend.services.SaleService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/ventas")
public class SaleController {
    
    @Autowired
    private SaleService saleService;

    @Autowired 
    private CellphoneService cellphoneService;

    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(e -> {
            errors.put(e.getField(), "El campo " + e.getField() + " " + e.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);

    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Sale sale, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }
        Optional<Cellphone> cellphoneSold = cellphoneService.findOne(sale.getCellphone().getId());
        if(cellphoneSold.isPresent() && cellphoneSold.get().getStock() >= 1 && cellphoneSold.get().isShown()){
            cellphoneSold.get().setShown(false);
            cellphoneSold.get().setStock(cellphoneSold.get().getStock() - 1);
            return ResponseEntity.status(HttpStatus.CREATED).body(saleService.save(sale));
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}") // poner el binding a la derecha de lo que vamos a validar
    public ResponseEntity<?> update(@Valid @RequestBody Sale sale, BindingResult result,
            @PathVariable Integer id) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }
        Optional<Sale> saleOptional = saleService.update(id, sale);
        if (saleOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(saleOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();

    }

    @GetMapping // historial de ventas, proteger
    public List<Sale> listAll() {
        return (List<Sale>) saleService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> view(@PathVariable Integer id) {
        Optional<Sale> saleOptional = saleService.findOne(id);
        if (saleOptional.isPresent()) {
            return ResponseEntity.ok(saleOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Sale> saleOptional = saleService.findOne(id);
        if (saleOptional.isPresent()) {
            saleService.delete(saleOptional.get().getId());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
