package celsmarket.backend.services;

import celsmarket.backend.entities.Cart;
import celsmarket.backend.entities.User;

public interface ICartService {
    Cart save(Cart cart); // post

    Cart findCart(User user); // get, no pongo el optional porque se supone que el carrito no existe si no
                              // existe el usuario

    // no hay delete porque se borra con el usuario.

    Cart addCellphoneToCart(Integer cartId, Integer cellphoneId);

    Cart removeCellphoneFromCart(Integer cartId, Integer cellphoneId);
}
