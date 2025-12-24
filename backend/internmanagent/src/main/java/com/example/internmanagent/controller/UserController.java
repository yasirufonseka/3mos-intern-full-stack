package com.example.internmanagent.controller;

import java.util.List;
import java.util.Optional;

import com.example.internmanagent.dto.AuthDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.internmanagent.dto.UserDto;
import com.example.internmanagent.model.UserModel;
import com.example.internmanagent.services.UserService;

@RestController
@RequestMapping("/api/users/")
public class UserController {

  @Autowired
  private UserService userService;

  @PostMapping("adduser")
  public ResponseEntity<String> addIntern(@RequestBody UserDto user) {
    // TODO: Use internService to save the intern
    userService.addUser(user);
    return ResponseEntity.ok("Intern added successfully");
  }

  @GetMapping("getalluser")
  public ResponseEntity<List<UserModel>> getAllInterns(){
    List<UserModel> interns = userService.getAllUsers();
    return ResponseEntity.ok(interns);
  }

  @GetMapping("byid")
  public ResponseEntity<Optional<UserModel>> getInternById (@RequestParam String id){
    Optional<UserModel> intern = userService.getUserByid(id);
    return ResponseEntity.status(200).body(intern);

  }

  @PutMapping("updateuser")
  public ResponseEntity<UserModel> updateIntern(@RequestParam String id ,@RequestBody UserDto updateUser){
    try{
     UserModel updateUsers = userService.updateUser(id,updateUser);
      return ResponseEntity.ok(updateUsers);

    } catch (Exception e) {
      throw new RuntimeException(e);
    }

  }

  @DeleteMapping("deleteuser")
  public ResponseEntity<String> deleteUser (@RequestParam String id){
    try{
      String deleteUser = userService.deleteUser(id);
      return ResponseEntity.status(200).body("user delete successful");
    }  catch (Exception e) {
      throw new RuntimeException("delete user unsuccessful");
    }
  }

  @PostMapping("login")
  public ResponseEntity<AuthDto> logIn (@RequestBody UserModel loginCredential){
    AuthDto userLogIn = userService.logIn(loginCredential);
    return ResponseEntity.ok(userLogIn);
  }



}
