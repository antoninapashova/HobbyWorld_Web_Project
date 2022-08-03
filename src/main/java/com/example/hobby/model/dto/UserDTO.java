package com.example.hobby.model.dto;

import java.util.List;

public class UserDTO {

    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private List<HobbyDTO> hobbiesOfUser;

    public UserDTO() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public List<HobbyDTO> getHobbiesOfUser() {
        return hobbiesOfUser;
    }

    public void setHobbiesOfUser(List<HobbyDTO> hobbiesOfUser) {
        this.hobbiesOfUser = hobbiesOfUser;
    }
}
