package com.restapi.RestapiProjrct.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.restapi.RestapiProjrct.Dto.DtoClass;
import com.restapi.RestapiProjrct.Helper.AES;
import com.restapi.RestapiProjrct.Repository.RepoInterface;

@Service
public class ServiceClass {
	@Autowired
	RepoInterface repoInterface;

	public ResponseEntity<Object> Add(DtoClass dto) {
	    String email = dto.getEmail();
	    String username = dto.getUserName();

	    boolean emailExists = repoInterface.existsByEmail(email);
	    boolean usernameExists = repoInterface.existsByUserName(AES.encrypt(username)); 

	    if (emailExists || usernameExists) {
	        Map<String, String> response = new HashMap<>();
	        if (emailExists) {
	            response.put("emailError", "Email already exists!");
	        }
	        if (usernameExists) {
	            response.put("usernameError", "Username already exists!");
	        }
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	    }

	    // Encrypt before saving
	    dto.setPassword(AES.encrypt(dto.getPassword()));
	    dto.setUserName(AES.encrypt(dto.getUserName()));
	    repoInterface.save(dto);

	    return ResponseEntity.status(HttpStatus.CREATED)
	            .body(Map.of("message", "User account created successfully!"));
	}



	public ResponseEntity<Object> logIn(String email1, String password) { 
	    DtoClass obj = repoInterface.findByEmail(email1);
	    
	    if (obj == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "USER ACCOUNT DOES NOT EXIST"));
	    }

	    String encryptPass = obj.getPassword();
	    String email=obj.getEmail();
	    if (!password.equals(AES.decrypt(encryptPass))&& email.equals(email1)) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "PASSWORD INCORRECT"));
	    }

	    return ResponseEntity.ok(Map.of("message", "USER LOGGED IN"));
	}


	

}
