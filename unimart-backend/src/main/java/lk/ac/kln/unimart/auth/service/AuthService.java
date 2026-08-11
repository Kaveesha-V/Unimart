package lk.ac.kln.unimart.auth.service;

import lk.ac.kln.unimart.auth.dto.*;
import lk.ac.kln.unimart.auth.entity.Role;
import lk.ac.kln.unimart.auth.entity.UserEntity;
import lk.ac.kln.unimart.auth.repository.UserRepository;
import lk.ac.kln.unimart.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("User with email " + request.getEmail() + " already exists.");
        }

        UserEntity user = UserEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .studentId(request.getStudentId())
                .campusLocation(request.getCampusLocation() != null ? request.getCampusLocation() : "Main Campus")
                .avatar(request.getAvatar() != null ? request.getAvatar() : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80")
                .verifiedStudent(true)
                .role(Role.ROLE_STUDENT)
                .build();

        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .accessToken(jwtToken)
                .user(mapToUserDto(user))
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        String jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .accessToken(jwtToken)
                .user(mapToUserDto(user))
                .build();
    }

    public UserDto mapToUserDto(UserEntity user) {
        return UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .studentId(user.getStudentId())
                .campusLocation(user.getCampusLocation())
                .avatar(user.getAvatar())
                .verifiedStudent(user.isVerifiedStudent())
                .role(user.getRole().name())
                .build();
    }
}
