package com.study_java.user;

import com.study_java.common.dto.ApiSuccessResponse;
import com.study_java.user.dto.CreateUserRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ApiSuccessResponse<List<User>> findAll() {
        List<User> mockUsers = List.of(
                new User("1", "Ashton", "ashton@gmail.com"),
                new User("2", "John", "john@gmail.com"),
                new User("3", "Jane", "jane@gmail.com"),
                new User("4","Tình","tinh@gmail.com")
        );

        return new ApiSuccessResponse<>(
                200,
                "Get users successful",
                 userService.findAll()
        );
    }

    @GetMapping("/{id}")
    public ApiSuccessResponse<User> findById(@PathVariable @NotBlank String id) {
        return new ApiSuccessResponse<>(
                200,
                "Get user successful",
                userService.findById(id)
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiSuccessResponse<User> create(
            @Valid @RequestBody CreateUserRequest request
    ) {
        return new ApiSuccessResponse<>(
                201,
                "Create user successful",
                userService.create(request)
        );
    }
}