package com.example.internmanagent.services;

import com.example.internmanagent.dto.AuthDto;
import com.example.internmanagent.dto.UserDto;
import com.example.internmanagent.model.UserModel;
import com.example.internmanagent.repository.UserRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public  class UserService  {

  private final PasswordEncoder passwordEncoder;
  private final UserRepo userRepo;

  public UserService(PasswordEncoder passwordEncoder, UserRepo userRepo) {
    this.passwordEncoder = passwordEncoder;
    this.userRepo = userRepo;
  }

  public String addUser(UserDto user) {
    try {
      UserModel addUser = new UserModel();

      addUser.setName(user.getName());
      addUser.setEmail(user.getEmail());
      addUser.setUsername(user.getUsername());
      addUser.setRole(user.getRole());
      addUser.setPassword(passwordEncoder.encode(user.getPassword()));

      userRepo.save(addUser);
      return "User Added Successfully";

    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public List<UserModel> getAllUsers() {
    try {
      List<UserModel> user = userRepo.findAll();
      return user;


    } catch (Exception e) {
      throw new RuntimeException(e);
    }

  }

  public Optional<UserModel> getUserByid(String id) {
    try {
      Optional<UserModel> intern = userRepo.findById(id);
      return intern;


    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public String updateUser(String id, UserDto updateUser) {
    try {
      Optional<UserModel> findUser = userRepo.findById(id);
      if (findUser.isPresent()) {
        UserModel user = findUser.get();
        user.setName(updateUser.getName());
        user.setEmail(updateUser.getEmail());
        user.setUsername(updateUser.getUsername());
        user.setRole(updateUser.getRole());
        user.setPassword(passwordEncoder.encode(updateUser.getPassword()));

        userRepo.save(user);
        return "Update Successful";
      } else {
        return String.valueOf(Optional.empty());
      }

    } catch (Exception e) {
      throw new RuntimeException("Can't find user" + id);
    }

  }

  public String deleteUser(String id) {
    Optional<UserModel> findUser = userRepo.findById(id);
    if (findUser.isPresent()) {
      userRepo.deleteById(id);
      return "delete Success";
    } else return "can't delete the inter please try again";

  }


  public AuthDto logIn(UserModel loinCredentials) {
    System.out.println("looking username"+ loinCredentials.getUsername());
    Optional<UserModel> logInUser = userRepo.findByUsername(loinCredentials.getUsername());
    System.out.println(logInUser);
    if (logInUser.isPresent()) {
      UserModel user = logInUser.get();
      if (passwordEncoder.matches(loinCredentials.getPassword(), user.getPassword())) {
          //return user id and role on successful login as object
        return new AuthDto("login success", user.getId(),user.getRole());

      }  else {
        return new AuthDto("Invalid Password", null, null);
      }
    } else {
      return new AuthDto("User not found", null, null);
    }
  }
}
