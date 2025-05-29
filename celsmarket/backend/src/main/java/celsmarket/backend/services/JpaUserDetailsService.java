package celsmarket.backend.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import celsmarket.backend.entities.User;
import celsmarket.backend.repositories.UserRepository;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> opUser = userRepository.findByEmail(email);
        System.out.println(opUser.get().toString() + "AAAAAAAAAAAAAAAAAAAAAAAA");
        if (opUser.isEmpty()) {
            throw new UsernameNotFoundException(String.format("Email %s no encontrado en el sistema.", email));
        }

        User user = opUser.orElseThrow();
        System.out.println("EN DETAILS " + user.toString());

        // GrantedAuthority authorities = new SimpleGrantedAuthority("ROLE_" +
        // user.getRole());
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()));

        System.out.println("EN DETAILS 2  " + new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(), true, true,
                true, true, authorities));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), true, true,
                true, true, authorities);

    }

}
