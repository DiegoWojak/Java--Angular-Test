package com.inventario.auth.application;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.inventario.auth.application.dto.LoginRequest;
import com.inventario.auth.application.dto.LoginResponse;
import com.inventario.auth.domain.InvalidCredentialsException;
import com.inventario.auth.domain.Usuario;
import com.inventario.auth.domain.UsuarioRepository;
import com.inventario.shared.infrastructure.security.JwtService;

@Service
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request){
        Usuario usuario = usuarioRepository.findByUsername(request.getUsername())
                .filter(Usuario::isActivo)
                .filter(u -> passwordEncoder.matches(request.getPassword(), u.getPasswordHash()))
                .orElseThrow(InvalidCredentialsException::new);

        String token = jwtService.generarToken(usuario.getUsername(), usuario.getRol());
        return new LoginResponse(token, "Bearer", jwtService.getExpirationMs(), usuario.getUsername(), usuario.getRol());
    }

}
