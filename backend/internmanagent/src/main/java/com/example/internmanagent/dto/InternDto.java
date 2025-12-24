package com.example.internmanagent.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InternDto {

  private String name;
  private  String email;
  private String department;
  private String mentor;
  private String status;
  private String university;
  private LocalDate startDate;
  private LocalDate endDate;
}
