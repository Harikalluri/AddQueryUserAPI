package Sicuro.QueryUserAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
 
@SpringBootApplication
@ComponentScan(basePackages = "Sicuro.QueryUserAPI") // Adjust package if needed
public class QueryUserApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(QueryUserApiApplication.class, args);
    }
}
