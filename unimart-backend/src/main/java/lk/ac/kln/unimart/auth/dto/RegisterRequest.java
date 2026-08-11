package lk.ac.kln.unimart.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private String studentId;
    private String campusLocation;
    private String avatar;

    public RegisterRequest() {
    }

    public RegisterRequest(String name, String email, String password, String studentId, String campusLocation, String avatar) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.studentId = studentId;
        this.campusLocation = campusLocation;
        this.avatar = avatar;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getCampusLocation() { return campusLocation; }
    public void setCampusLocation(String campusLocation) { this.campusLocation = campusLocation; }
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
}
