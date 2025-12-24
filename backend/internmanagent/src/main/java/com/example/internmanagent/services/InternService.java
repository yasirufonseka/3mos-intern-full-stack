package com.example.internmanagent.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.internmanagent.dto.InternDto;
import com.example.internmanagent.model.InternModel;
import com.example.internmanagent.repository.InternRepo;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class InternService {

  @Autowired
  private InternRepo internRepo;

  public InternModel addIntern(InternDto result) {
    InternModel internModel = new InternModel();

    try {
      internModel.setName(result.getName());
      internModel.setEmail(result.getEmail());
      internModel.setDepartment(result.getDepartment());
      internModel.setMentor(result.getMentor());
      internModel.setStartDate(result.getStartDate());
      internModel.setEndDate(result.getEndDate());
      internModel.setStatus(result.getStatus());
      internModel.setUniversity(result.getUniversity());
      System.out.print(result);
      InternModel addintern = internRepo.save(internModel);

      return addintern;

    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public List<InternModel> getAllInterns(){

    try {
        List<InternModel> allInterns = internRepo.findAll();
        return allInterns;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }

  }

  public Optional<InternModel> getInternById(String id) {
    try{
    Optional<InternModel> intern = internRepo.findById(id);
    return intern;


    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public InternModel updateInter(String id, InternDto updateintern) {

      InternModel excistingIntern = internRepo.findById(id).orElseThrow(()-> new RuntimeException("intern not found"+id));
      System.out.print(excistingIntern);


        excistingIntern.setName(updateintern.getName());
        excistingIntern.setEmail(updateintern.getEmail());
        excistingIntern.setDepartment(updateintern.getDepartment());
        excistingIntern.setMentor((updateintern.getMentor()));
        excistingIntern.setStatus(updateintern.getStatus());
        excistingIntern.setUniversity(updateintern.getUniversity());
        excistingIntern.setStartDate(updateintern.getStartDate());
        excistingIntern.setEndDate(updateintern.getEndDate());

     return internRepo.save(excistingIntern);


  }

  public String deleteIntern(String id) {
    Optional<InternModel> findIntern = internRepo.findById(id);
    if(findIntern.isPresent()){
      internRepo.deleteById(id);
      return "delete Success";
    }else return "can't delete the inter please try again";

  }


}
