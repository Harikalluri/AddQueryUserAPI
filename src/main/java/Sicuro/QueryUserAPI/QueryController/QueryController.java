package Sicuro.QueryUserAPI.QueryController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Sicuro.QueryUserAPI.QueryServices.QueryService;

@RestController
@RequestMapping("/query") // Base path for all endpoints
@CrossOrigin(origins = "http://localhost:5175") // Allow frontend requests
public class QueryController {

    @Autowired
    QueryService queryService;

    @GetMapping("/display") // This maps to "/query/admin"
    public ResponseEntity<Object> admin() { 
        return queryService.findAll();
    }
}
