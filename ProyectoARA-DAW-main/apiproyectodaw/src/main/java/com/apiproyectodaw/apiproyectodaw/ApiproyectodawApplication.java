package com.apiproyectodaw.apiproyectodaw;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.apiproyectodaw.apiproyectodaw.config.FileStorageProperties;

@SpringBootApplication
@EnableConfigurationProperties({
    FileStorageProperties.class
})
public class ApiproyectodawApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiproyectodawApplication.class, args);
	}

}
