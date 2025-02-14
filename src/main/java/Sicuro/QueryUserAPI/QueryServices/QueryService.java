package Sicuro.QueryUserAPI.QueryServices;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import Sicuro.QueryUserAPI.Helper.AES;
import Sicuro.QueryUserAPI.QueryDto.DtoClass;
import Sicuro.QueryUserAPI.QueryRepository.QueryRepo;

@Service
public class QueryService {

	@Autowired
	QueryRepo queryRepo;
	
	
	public ResponseEntity<Object> findAll() {
	    try {
	        List<DtoClass> list = queryRepo.findAll();
	        
	        // 🔹 Decrypt only the userName before sending the response
	        for (DtoClass user : list) {
	            String decryptedUserName = AES.decrypt(user.getUserName()); 
	            user.setUserName(decryptedUserName);  
	        }

//	        // Debugging Statement
//	        System.out.println("Fetched Users: " + list); 

	        if (list.isEmpty()) {
	            return new ResponseEntity<>(Map.of("Update", "Autobots Not Found"), HttpStatus.NOT_FOUND);
	        } 
	        return new ResponseEntity<>(Map.of("Update", "Autobots Found", "Info", list), HttpStatus.OK);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseEntity<>(Map.of("Error", "Something went wrong"), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

}
