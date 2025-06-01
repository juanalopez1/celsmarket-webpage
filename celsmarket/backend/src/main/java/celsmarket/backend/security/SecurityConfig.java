package celsmarket.backend.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import celsmarket.backend.security.filter.JwtAuthenticationFilter;
import celsmarket.backend.security.filter.JwtValidationFilter;

@Configuration
@EnableMethodSecurity(prePostEnabled = true) // activa las anotaciones de los permisos de las rutas
public class SecurityConfig {

    @Autowired
    private AuthenticationConfiguration authConfig;

    @Bean
    AuthenticationManager authenticationManager() throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(authz -> authz
                .requestMatchers(HttpMethod.POST, "/users/register").permitAll()
                .requestMatchers(HttpMethod.GET, "/inventory/availables/{id}").permitAll()
                .requestMatchers(HttpMethod.GET, "/inventory/availables").permitAll()
                .requestMatchers(HttpMethod.POST, "/inventory").hasRole("admin")
                .requestMatchers(HttpMethod.DELETE, "/inventory").hasRole("admin")
                .requestMatchers(HttpMethod.PUT, "/inventory").hasRole("admin")
                .requestMatchers(HttpMethod.GET, "/inventory").hasRole("admin")
                .requestMatchers(HttpMethod.GET, "/users").hasRole("admin")
                .requestMatchers("/brands/**").hasRole("admin")
                .requestMatchers("/sales/**").hasRole("admin")
                .requestMatchers("/cities/**").hasRole("admin")
                .requestMatchers("/colors/**").hasRole("admin")
                .requestMatchers("/conditions/**").hasRole("admin")
                .requestMatchers("/currencies/**").hasRole("admin")
                .requestMatchers("/models/**").hasRole("admin")
                .requestMatchers("/storages/**").hasRole("admin")
                .requestMatchers("/sales/{id}").authenticated()
                .requestMatchers("/users/{id}").authenticated()
                .requestMatchers("/carts/**").permitAll()
                .anyRequest().authenticated())
                .addFilter(new JwtValidationFilter(authConfig.getAuthenticationManager())) // todo el filtro y

                .addFilter(new JwtAuthenticationFilter(authConfig.getAuthenticationManager())) // todo el filtro y
                                                                                               // validacion del jwt
                .csrf(config -> config.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(man -> man.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    FilterRegistrationBean<CorsFilter> corsFilter() {
        FilterRegistrationBean<CorsFilter> corsBean = new FilterRegistrationBean<>(
                new CorsFilter(corsConfigurationSource()));
        corsBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return corsBean;
    }
}
