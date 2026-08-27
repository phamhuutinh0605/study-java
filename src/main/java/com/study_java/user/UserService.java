package com.study_java.user;

import com.study_java.common.exception.AppException;
import com.study_java.user.dto.CreateUserRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

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
        return userRepository.findById(id).orElseThrow(() -> new AppException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public User create(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        User user = new User(
                UUID.randomUUID().toString(),
                request.getName(),
                request.getEmail()
        );


        return userRepository.save(user);
    }
}