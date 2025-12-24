import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Intern } from '../models/intern/intern.module';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private internDataSubject = new Subject<{intern: Intern, isEditMode: boolean}>();
  internSubject$ = this.internDataSubject.asObservable();


  sendInternData(intern:Intern, isEditMode:boolean){
    this.internDataSubject.next({intern, isEditMode});
  }

 
}
