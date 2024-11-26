package com.se.ssps_be.service;

/**
 * 	It is a service to authenticate user.
 * 	stimulate the authentication process with redirect to hcmut_sso 3rd party login page and
 * 	return User object if user is authenticated, otherwise throw UnauthenticatedException
 * 	it may throw exception if the 3rd party is not available
 * 	it may throw exception if the user is not found
 * 	it also use for authorization a user is role student or role SPSO
 * @author aqbtech
 * @version 1.0
 */
public interface AuthService {
	boolean authenticate(String username, String password);
	boolean authorize(String username, String role);
}
