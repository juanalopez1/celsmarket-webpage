package celsmarket.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import celsmarket.backend.entities.Cart;
import celsmarket.backend.entities.Cellphone;
import celsmarket.backend.entities.User;
import celsmarket.backend.repositories.CartRepository;
import celsmarket.backend.repositories.CellphoneRepository;

@Service
public class CartService implements ICartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CellphoneRepository cellphoneRepository;

    @Override
    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public Cart findCart(User user) {
        return cartRepository.findByUserCart(user);
    }

    @Override
    public Cart addCellphoneToCart(Integer cartId, Integer cellphoneId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        Cellphone cellphone = cellphoneRepository.findById(cellphoneId)
                .orElseThrow(() -> new RuntimeException("Celular no encontrado"));

        cart.getCellphones().add(cellphone);
        return cartRepository.save(cart);
    }

    @Override
    public Cart removeCellphoneFromCart(Integer cartId, Integer cellphoneId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        Cellphone cellphone = cellphoneRepository.findById(cellphoneId)
                .orElseThrow(() -> new RuntimeException("Celular no encontrado"));

        cart.getCellphones().remove(cellphone);
        return cartRepository.save(cart);
    }

}
