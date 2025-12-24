package com.example.internmanagent.repository;

import com.example.internmanagent.model.InternModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InternRepo extends MongoRepository<InternModel, String> {





}
