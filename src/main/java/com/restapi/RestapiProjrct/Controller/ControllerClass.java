package com.restapi.RestapiProjrct.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restapi.RestapiProjrct.Dto.DtoClass;
import com.restapi.RestapiProjrct.Service.ServiceClass;

@RestController
@RequestMapping("/job")
@CrossOrigin(origins = "http://localhost:5175") 
public class ControllerClass {
	@Autowired
	ServiceClass service; 

	@PostMapping("/add")
	public ResponseEntity<Object> Add(@RequestBody DtoClass dto) {
		return service.Add(dto);
	}
 
	@PostMapping("/login")
	public ResponseEntity<Object> logIn(@RequestBody DtoClass dtoClass) {
		return service.logIn(dtoClass.getEmail(), dtoClass.getPassword());
	}


}
