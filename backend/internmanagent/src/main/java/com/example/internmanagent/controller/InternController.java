package com.example.internmanagent.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.internmanagent.dto.InternDto;
import com.example.internmanagent.model.InternModel;
import com.example.internmanagent.services.InternService;

@RestController
@RequestMapping("api/intern/")
public class InternController {

  private final InternService internService;

  public InternController(InternService internService) {
    this.internService = internService;
  }

  @PostMapping("addintern")
  public ResponseEntity<InternModel> addIntern(@RequestBody InternDto intern) {
    // TODO: Use internService to save the intern
   InternModel addintern =   internService.addIntern(intern);
     System.out.println("this is intern"+intern);
    return ResponseEntity.ok(addintern);
  }

  @GetMapping("getallinterns")
  public ResponseEntity<List<InternModel>> getAllInterns(){
    List<InternModel> interns = internService.getAllInterns();
    return ResponseEntity.ok(interns);
  }

  @GetMapping("byid")
  public ResponseEntity<Optional<InternModel>> getInternById (@RequestParam String id){
    Optional<InternModel> intern = internService.getInternById(id);
    return ResponseEntity.status(200).body(intern);

  }

@PutMapping("updateintern")
  public ResponseEntity<InternModel> updateIntern(@RequestParam String id ,@RequestBody InternDto updateintern){
    try{
      InternModel updateInterns = internService.updateInter(id,updateintern);
     return ResponseEntity.status(200).body(updateInterns);

    } catch (Exception e) {
      throw new RuntimeException(e);
    }

}

@DeleteMapping("deleteintern")
  public ResponseEntity<String> deleteIntern (@RequestParam String id){
  try{
    String deleteintern = internService.deleteIntern(id);
  return ResponseEntity.status(200).body(deleteintern);
  }  catch (Exception e) {
    throw new RuntimeException(e);
  }
  }
}
