package com.example.internmanagent.repository;

import com.example.internmanagent.model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepo extends MongoRepository<UserModel , String> {

  Optional<UserModel> findByUsername(String username);
}
