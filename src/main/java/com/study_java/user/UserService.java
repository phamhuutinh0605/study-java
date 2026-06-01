package com.study_java.user;

import com.study_java.user.dto.CreateUserRequest;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public User create(@Valid @Validated @RequestBody CreateUserRequest request) {
        User user = new User(
                UUID.randomUUID().toString(),
                request.getName(),
                request.getEmail()
        );

        return userRepository.save(user);
    }
}