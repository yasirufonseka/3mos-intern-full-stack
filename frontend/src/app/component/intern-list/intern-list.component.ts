import { Component, Input, OnInit } from '@angular/core';
import { Intern, InternFormData } from '../../models/intern/intern.module';
import { InternService } from '../../services/intern.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddInternModalComponent } from '../add-intern-modal/add-intern-modal.component';
import { DataService } from '../../services/data.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-intern-list',
  imports: [CommonModule, FormsModule, RouterModule, AddInternModalComponent, NgIf, NgFor, NgxPaginationModule],
  templateUrl: './intern-list.component.html',
  styleUrl: './intern-list.component.scss'
})
export class InternListComponent implements OnInit {
  private internService: InternService;
  private dataService: DataService;

  selectedStatus: string = '';
  selectedDepartment: string = '';
  searchTerm: string = '';
  interns: Intern[] = [];
  loading = false;
  isModalOpen = false;
  selectedIntern: Intern | null = null;
  paginatedInterns: Intern[] | undefined;
  pageNo: number = 1;
  itemsPerPage: number = 5;
  filteredInterns: Intern[] = this.interns;




  departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Design'];
  statuses = ['active', 'completed', 'terminated'];
 
  constructor(internService: InternService, dataService: DataService) {
    this.internService = internService;
    this.dataService = dataService;
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadInterns();

    this.internService.onrefresh().subscribe(() => {
      this.loadInterns();
    })
//show newly added intern in the list
   

  }

  loadInterns() {
    this.internService.getInterns().subscribe({
      next: (data) => {
        console.log('Interns fetched:', data);
        this.interns = (data || []).reverse(); // Reverse to show newest first
        this.filteredInterns = data;
        this.loading = false;
        console.log('Interns loaded into component:', this.interns);
      },
      error: (error) => {
        console.error('Error fetching interns:', error);
        this.loading = false;
      }
    });
  }

  onEditIntern(intern: Intern) {
    console.log('Edit intern clicked:', intern);
    // Implement your edit logic here
    this.openModal();
    this.selectedIntern = intern;
    this.sendToChild();


  }

  onDeleteIntern(intern: Intern) {
    this.internService.deleteIntern(intern.id!);

  }

  sendToChild() {
    this.dataService.sendInternData(this.selectedIntern!, true);
  }


  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
 onSearch() {
    //check search is empty
    if(!this.searchTerm){
      this.filteredInterns = this.interns;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredInterns= this.interns.filter(intern=>{
      return(
      intern.name.toLowerCase().includes(term) ||
      intern.email.toLowerCase().includes(term)||
      intern.department.toLowerCase().includes(term)
    );
    });
  }

   onFilter() {
   this.filteredInterns = this.interns.filter(intern => {
      const matchesDepartment = this.selectedDepartment ? intern.department === this.selectedDepartment : true;
      const matchesStatus = this.selectedStatus ? intern.status === this.selectedStatus : true;
      return matchesStatus && matchesDepartment ;
    });
  }
  clearFilters() {
    //create a function to clear filters
    this.selectedDepartment = '';
    this.selectedStatus = '';
    this.searchTerm = '';
    this.filteredInterns = this.interns;
    
  
  }

}
