package lk.ac.kln.unimart.auth.dto;

public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private long expiresIn = 86400; // 24 hours in seconds
    private UserDto user;

    public AuthResponse() {
    }

    public AuthResponse(String accessToken, String tokenType, long expiresIn, UserDto user) {
        this.accessToken = accessToken;
        this.tokenType = tokenType != null ? tokenType : "Bearer";
        this.expiresIn = expiresIn > 0 ? expiresIn : 86400;
        this.user = user;
    }

    public static AuthResponseBuilder builder() {
        return new AuthResponseBuilder();
    }

    public static class AuthResponseBuilder {
        private String accessToken;
        private String tokenType = "Bearer";
        private long expiresIn = 86400;
        private UserDto user;

        public AuthResponseBuilder accessToken(String accessToken) { this.accessToken = accessToken; return this; }
        public AuthResponseBuilder tokenType(String tokenType) { this.tokenType = tokenType; return this; }
        public AuthResponseBuilder expiresIn(long expiresIn) { this.expiresIn = expiresIn; return this; }
        public AuthResponseBuilder user(UserDto user) { this.user = user; return this; }

        public AuthResponse build() {
            return new AuthResponse(accessToken, tokenType, expiresIn, user);
        }
    }

    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }
    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }
    public long getExpiresIn() { return expiresIn; }
    public void setExpiresIn(long expiresIn) { this.expiresIn = expiresIn; }
    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }
}
