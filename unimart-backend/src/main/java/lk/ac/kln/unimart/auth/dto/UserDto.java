package lk.ac.kln.unimart.auth.dto;

public class UserDto {
    private String id;
    private String name;
    private String email;
    private String studentId;
    private String campusLocation;
    private String avatar;
    private boolean verifiedStudent;
    private String role;

    public UserDto() {
    }

    public UserDto(String id, String name, String email, String studentId, String campusLocation, String avatar, boolean verifiedStudent, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.studentId = studentId;
        this.campusLocation = campusLocation;
        this.avatar = avatar;
        this.verifiedStudent = verifiedStudent;
        this.role = role;
    }

    public static UserDtoBuilder builder() {
        return new UserDtoBuilder();
    }

    public static class UserDtoBuilder {
        private String id;
        private String name;
        private String email;
        private String studentId;
        private String campusLocation;
        private String avatar;
        private boolean verifiedStudent;
        private String role;

        public UserDtoBuilder id(String id) { this.id = id; return this; }
        public UserDtoBuilder name(String name) { this.name = name; return this; }
        public UserDtoBuilder email(String email) { this.email = email; return this; }
        public UserDtoBuilder studentId(String studentId) { this.studentId = studentId; return this; }
        public UserDtoBuilder campusLocation(String campusLocation) { this.campusLocation = campusLocation; return this; }
        public UserDtoBuilder avatar(String avatar) { this.avatar = avatar; return this; }
        public UserDtoBuilder verifiedStudent(boolean verifiedStudent) { this.verifiedStudent = verifiedStudent; return this; }
        public UserDtoBuilder role(String role) { this.role = role; return this; }

        public UserDto build() {
            return new UserDto(id, name, email, studentId, campusLocation, avatar, verifiedStudent, role);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getCampusLocation() { return campusLocation; }
    public void setCampusLocation(String campusLocation) { this.campusLocation = campusLocation; }
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public boolean isVerifiedStudent() { return verifiedStudent; }
    public void setVerifiedStudent(boolean verifiedStudent) { this.verifiedStudent = verifiedStudent; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
