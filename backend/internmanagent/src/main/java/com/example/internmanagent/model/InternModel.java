package com.example.internmanagent.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "interns")
@Getter @Setter
@NoArgsConstructor
public class InternModel {

  @Id
  private String id;
  private String name;
//  @Indexed(unique = true)
  private  String email;
  private String department;
  private String mentor;
  private String university;
  private String status;
 // @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private LocalDate startDate;
 // @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private LocalDate endDate;

}
