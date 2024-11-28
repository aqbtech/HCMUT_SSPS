package com.se.ssps_be.service.impl;

import com.se.ssps_be.service.AuthService;
import org.springframework.stereotype.Service;



@Service
public class AuthenticationProvider implements AuthService {

	@Override
	public boolean authenticate(String username, String password) {
		return false;
	}

	@Override
	public boolean authorize(String username, String role) {
		return false;
	}

}
