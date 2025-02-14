package Sicuro.QueryUserAPI.QueryRepository;

import org.springframework.data.jpa.repository.JpaRepository;


import Sicuro.QueryUserAPI.QueryDto.DtoClass;

public interface QueryRepo extends JpaRepository<DtoClass, Integer> {

}
