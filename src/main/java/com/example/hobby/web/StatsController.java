package com.example.hobby.web;

import com.example.hobby.model.dto.HobbyDTO;
import com.example.hobby.model.dto.UserDTO;
import com.example.hobby.model.entity.Hobby;
import com.example.hobby.model.entity.User;
import com.example.hobby.service.CloudinaryService;
import com.example.hobby.service.HobbyService;
import com.example.hobby.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/statistic")
public class StatsController {

    private final HobbyService hobbyService;
    private final CloudinaryService cloudinaryService;
    private final UserService userService;
    private final ModelMapper mapper;

    public StatsController(HobbyService hobbyService, CloudinaryService cloudinaryService, UserService userService, ModelMapper mapper) {
        this.hobbyService = hobbyService;
        this.cloudinaryService = cloudinaryService;
        this.userService = userService;
        this.mapper = mapper;
    }


    @GetMapping
    public ResponseEntity<List<HobbyDTO>> getAllHobbies(){
        List<HobbyDTO> allHobbies = hobbyService.getAllHobbies();
        return ResponseEntity.ok(allHobbies);
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<HobbyDTO>> getHobbiesByUsername(@PathVariable ("username") String username) {

        User user = userService.getByUsername(username);
        UserDTO userDTO = mapper.map(user, UserDTO.class);
        List<HobbyDTO> hobbies= userDTO.getHobbiesOfUser();

        if (hobbies==null) {
            return ResponseEntity.
                    notFound().
                    build();
        } else {
            return ResponseEntity.ok(hobbies);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HobbyDTO> deleteHobby(@PathVariable("id") Long id) {
        hobbyService.deleteHobby(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user")
    public ResponseEntity<List<UserDTO>> getUsersByUsername() {

        List<UserDTO> users=userService.getAllUsers();

        if (users.isEmpty()) {
            return ResponseEntity.
                    notFound().
                    build();
        } else {
            return ResponseEntity.ok(users);
        }
    }

    @DeleteMapping("user/{id}")
    public ResponseEntity<UserDTO> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
