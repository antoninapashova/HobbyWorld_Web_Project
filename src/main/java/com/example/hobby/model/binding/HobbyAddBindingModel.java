package com.example.hobby.model.binding;

import com.example.hobby.model.entity.enums.HobbyCategoryEnum;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;

public class HobbyAddBindingModel {

    private MultipartFile multipartFile;
    private String title;
    private HobbyCategoryEnum hobbyCategoryEnum;
    private String description;

    public HobbyAddBindingModel() {
    }

    @NotNull(message="Please add a picture")
    public MultipartFile getMultipartFile() {
        return multipartFile;
    }

    public void setMultipartFile(MultipartFile multipartFile) {
        this.multipartFile = multipartFile;
    }

    @NotEmpty(message = "Title cannot be empty")
    @Size(min=3, message = "Title must be more than 3 characters")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @NotNull(message = "Please, choose between different categories!")
    public HobbyCategoryEnum getHobbyCategoryEnum() {
        return hobbyCategoryEnum;
    }

    public void setHobbyCategoryEnum(HobbyCategoryEnum hobbyCategoryEnum) {
        this.hobbyCategoryEnum = hobbyCategoryEnum;
    }

    @NotEmpty(message = "Please, add description!")
    @Size(min=5, message = "Description must be more than 5 characters")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
