package com.example.desafio_lume;

import com.example.desafio_lume.model.Usuario;
import com.example.desafio_lume.repository.UsuarioRepository;
import com.example.desafio_lume.utils.StringUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class DesafioLumeApplication {

	public static void main(String[] args) {
		SpringApplication.run(DesafioLumeApplication.class, args);
	}

	@Bean
	CommandLineRunner initDefaultUser(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			Usuario usuario = usuarioRepository.findByNome("admin");

			if (StringUtils.isNullOrEmpty(usuario)) {

				Usuario admin = new Usuario(
						"admin",
						passwordEncoder.encode("pass")
				);

				usuarioRepository.save(admin);

				System.out.println("Usuário padrão criado: admin / pass");
			}
		};
	}

}
