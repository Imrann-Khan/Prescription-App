package com.example.backend.config;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader {

	@Bean
	CommandLineRunner initUsers(UserRepository users, PasswordEncoder encoder) {
		return args -> {
			if (users.count() == 0) {
				User admin = new User();
				admin.setUsername("admin");
				admin.setPassword(encoder.encode("password"));
				admin.setRoles("ROLE_USER,ROLE_ADMIN");
				users.save(admin);

				User user = new User();
				user.setUsername("user");
				user.setPassword(encoder.encode("user123"));
				user.setRoles("ROLE_USER");
				users.save(user);
			}
		};
	}
}
