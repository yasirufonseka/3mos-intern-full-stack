package com.example.internmanagent.model;


import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "user")
@Getter @Setter
@NoArgsConstructor
public class UserModel {

  @Id
  private String id;
  private String name;
  @Indexed(unique = true)
  private String email;
  @Indexed(unique = true)
  @Field("username")
  private String username;
  private String password;
  @Size(max = 5)
  private String role;

}
