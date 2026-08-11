package lk.ac.kln.unimart.common.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public")
public class HealthController {

    @GetMapping("/ping")
    public ResponseEntity<Map<String, Object>> ping() {
        return ResponseEntity.ok(Map.of(
                "service", "unimart-backend",
                "status", "UP",
                "database", "PostgreSQL",
                "time", Instant.now().toString()
        ));
    }
}
