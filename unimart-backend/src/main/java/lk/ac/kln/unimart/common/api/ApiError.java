package lk.ac.kln.unimart.common.api;

import java.time.Instant;
import java.util.Map;

public class ApiError {
    private int status;
    private String error;
    private String message;
    private String path;
    private Instant timestamp = Instant.now();
    private Map<String, String> fieldErrors;

    public ApiError() {
    }

    public ApiError(int status, String error, String message, String path, Instant timestamp, Map<String, String> fieldErrors) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
        this.timestamp = timestamp != null ? timestamp : Instant.now();
        this.fieldErrors = fieldErrors;
    }

    public static ApiErrorBuilder builder() {
        return new ApiErrorBuilder();
    }

    public static class ApiErrorBuilder {
        private int status;
        private String error;
        private String message;
        private String path;
        private Instant timestamp = Instant.now();
        private Map<String, String> fieldErrors;

        public ApiErrorBuilder status(int status) {
            this.status = status;
            return this;
        }

        public ApiErrorBuilder error(String error) {
            this.error = error;
            return this;
        }

        public ApiErrorBuilder message(String message) {
            this.message = message;
            return this;
        }

        public ApiErrorBuilder path(String path) {
            this.path = path;
            return this;
        }

        public ApiErrorBuilder timestamp(Instant timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public ApiErrorBuilder fieldErrors(Map<String, String> fieldErrors) {
            this.fieldErrors = fieldErrors;
            return this;
        }

        public ApiError build() {
            return new ApiError(status, error, message, path, timestamp, fieldErrors);
        }
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Map<String, String> getFieldErrors() {
        return fieldErrors;
    }

    public void setFieldErrors(Map<String, String> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }
}
