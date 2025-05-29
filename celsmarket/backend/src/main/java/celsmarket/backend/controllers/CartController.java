package celsmarket.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import celsmarket.backend.entities.Cart;
import celsmarket.backend.entities.User;
import celsmarket.backend.repositories.CartRepository;
import celsmarket.backend.repositories.UserRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/carts")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Cart> getAll() {
        return (List<Cart>) cartRepository.findAll();
    }

    @GetMapping("/{userId}") 
    public ResponseEntity<?> getUsersCart(@PathVariable Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        System.out.println(user.get().getName());
        if (user.isPresent()) {
            Cart cart = cartRepository.findByUserCart(user.get());
            return ResponseEntity.ok(cart);
        }
        return ResponseEntity.notFound().build();
    }

}
