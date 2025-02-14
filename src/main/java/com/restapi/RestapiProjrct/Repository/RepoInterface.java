package com.restapi.RestapiProjrct.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restapi.RestapiProjrct.Dto.DtoClass;

@Repository
public interface RepoInterface extends JpaRepository<DtoClass, Integer>
{

	boolean existsByEmail(String email);

	DtoClass findByEmail(String email);

	

	boolean existsByUserName(String userName);
	

}
