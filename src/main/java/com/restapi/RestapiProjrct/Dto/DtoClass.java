package com.restapi.RestapiProjrct.Dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.Data;

@Entity(name = "userapi")
@Data
public class DtoClass {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	
	private String email; 
	
	private String firstName;
	
	private String lastName;
	
	private String userName;

	private String password;
	
	@Transient
	private String confirmPassword;
 
	@Override
	public String toString() {
		return "DtoClass [firstName=" + firstName + ", email=" + email + ", password=" + password + ", confirmPassword="
				+ confirmPassword + "]";
	}

}
