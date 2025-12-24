import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Intern, InternFormData } from '../models/intern/intern.module';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InternService {
  private apiUrl = 'http://localhost:8080/api/intern';

  private refreshIntern$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

 getInterns(): Observable<Intern[]> {
  return this.http.get<Intern[]>(`${this.apiUrl}/getallinterns`);
}

  getInternById(id: string){
    // Mock implementation

  }

  createIntern(intern: InternFormData) {
    this.http.post<Intern>(`${this.apiUrl}/addintern`, intern).subscribe({
      next: (data) => {
        Swal.fire('Success', 'Intern created successfully', 'success');
        this.refreshInternList();
      },
      error: (error) => Swal.fire('Error', 'Failed to create intern', 'error')
    });
  }

  updateIntern(id: string, intern: InternFormData){
    this.http.put<Intern>(`${this.apiUrl}/updateintern?id=${id}`, intern).subscribe({
      next: (data) => {
        Swal.fire('Success', 'Intern updated successfully', 'success');
        this.refreshInternList();
      },
      error: (error) => Swal.fire('Error', 'Failed to update intern', 'error')
    });
    

  }
  deleteIntern(id: string){
    this.http.delete<Intern>(`${this.apiUrl}/deleteintern?id=${id}`).subscribe({
      next: (data) => {
        Swal.fire('Success', 'Intern deleted successfully', 'success');
        this.refreshInternList();
      },
      error: (error) => Swal.fire('Error', 'Failed to delete intern', 'error')
    });
  }




  refreshInternList(): void {
    this.refreshIntern$.next(true);
  }
  onrefresh(){
    return this.refreshIntern$.asObservable();
  }

  
}