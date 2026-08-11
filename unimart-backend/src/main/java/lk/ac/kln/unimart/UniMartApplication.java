package lk.ac.kln.unimart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;        
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan(basePackages = { "lk.ac.kln.unimart", "lk.ac.kln.unimart.model", "lk.ac.kln.unimart.repository" })
public class UniMartApplication {

    public static void main(String[] args) {
        SpringApplication.run(UniMartApplication.class, args);
    }
}
