package lk.ac.kln.unimart.auth.entity;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    private String studentId;
    private String campusLocation;
    private String avatar;
    private boolean verifiedStudent = true;

    @Enumerated(EnumType.STRING)
    private Role role = Role.ROLE_STUDENT;

    private Instant createdAt = Instant.now();

    public UserEntity() {
    }

    public UserEntity(String id, String email, String password, String name, String studentId, String campusLocation, String avatar, boolean verifiedStudent, Role role, Instant createdAt) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.studentId = studentId;
        this.campusLocation = campusLocation;
        this.avatar = avatar;
        this.verifiedStudent = verifiedStudent;
        this.role = role != null ? role : Role.ROLE_STUDENT;
        this.createdAt = createdAt != null ? createdAt : Instant.now();
    }

    public static UserEntityBuilder builder() {
        return new UserEntityBuilder();
    }

    public static class UserEntityBuilder {
        private String id;
        private String email;
        private String password;
        private String name;
        private String studentId;
        private String campusLocation;
        private String avatar;
        private boolean verifiedStudent = true;
        private Role role = Role.ROLE_STUDENT;
        private Instant createdAt = Instant.now();

        public UserEntityBuilder id(String id) { this.id = id; return this; }
        public UserEntityBuilder email(String email) { this.email = email; return this; }
        public UserEntityBuilder password(String password) { this.password = password; return this; }
        public UserEntityBuilder name(String name) { this.name = name; return this; }
        public UserEntityBuilder studentId(String studentId) { this.studentId = studentId; return this; }
        public UserEntityBuilder campusLocation(String campusLocation) { this.campusLocation = campusLocation; return this; }
        public UserEntityBuilder avatar(String avatar) { this.avatar = avatar; return this; }
        public UserEntityBuilder verifiedStudent(boolean verifiedStudent) { this.verifiedStudent = verifiedStudent; return this; }
        public UserEntityBuilder role(Role role) { this.role = role; return this; }
        public UserEntityBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public UserEntity build() {
            return new UserEntity(id, email, password, name, studentId, campusLocation, avatar, verifiedStudent, role, createdAt);
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role != null ? role.name() : Role.ROLE_STUDENT.name()));
    }

    @Override public String getUsername() { return email; }
    @Override public String getPassword() { return password; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getCampusLocation() { return campusLocation; }
    public void setCampusLocation(String campusLocation) { this.campusLocation = campusLocation; }
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public boolean isVerifiedStudent() { return verifiedStudent; }
    public void setVerifiedStudent(boolean verifiedStudent) { this.verifiedStudent = verifiedStudent; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
