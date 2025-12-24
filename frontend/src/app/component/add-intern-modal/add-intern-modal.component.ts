import { Component, EventEmitter, Output, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Intern, InternFormData } from '../../models/intern/intern.module';
import { InternService } from '../../services/intern.service';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-intern-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-intern-modal.component.html',
  styleUrl: './add-intern-modal.component.scss'
})
export class AddInternModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<InternFormData>();




addintern: FormGroup;
intern:Intern|null = null;
subscription:Subscription;
isEditMode = false;
  
constructor(private fb: FormBuilder, private internService: InternService, private dataservice:DataService) {
this.addintern = this.fb.group({
name: ['',[Validators.required, Validators.minLength(3)]],
email: ['',[Validators.required, Validators.email]],
department: ['',[Validators.required]],
status: ['',[Validators.required]],
startDate: ['',[Validators.required]],
endDate: ['',[Validators.required]],
university: ['',[Validators.required]],
mentor: ['',[Validators.required]],
});

this.subscription = this.dataservice.internSubject$.subscribe(internDataSubject=>{
  this.intern = internDataSubject.intern;
  this.isEditMode = internDataSubject.isEditMode;
  console.log('Received intern data in modal:', this.intern);


if(this.isEditMode && this.intern){
 console.log('Edit Mode Active');
      console.log('Intern to be edited:', this.intern); 
    
    this.addintern.patchValue({
      name: this.intern.name,
      email:this.intern.email,
      department:this.intern.department,
      status:this.intern.status || this.intern.status,
      startDate:this.intern.startDate,
      endDate:this.intern.endDate,
      university:this.intern.university,
      mentor:this.intern.mentor,
    });
  }
  });
}

 

  departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Design'];
  statuses: Array<'active' | 'completed' | 'terminated'> = ['active', 'completed', 'terminated'];
  isSubmitting = false;

  onClose(): void {
    this.close.emit();
    this.resetForm();
  }

  onSubmit(): void {
    if(this.isEditMode==false){
    if (this.addintern.invalid) return;
    this.isSubmitting = true;
    const formData: InternFormData = this.addintern.value;
    console.log('Submitting form data:', formData);
    this.internService.createIntern(formData);
    
    this.isSubmitting = false;
    this.onClose();
    }else{
      if (this.addintern.invalid || !this.intern?.id){
        swal.fire('Error', 'Form is invalid or Intern ID is missing', 'error');
        return ;
      } 
      this.isSubmitting = true;
      const formData: InternFormData = this.addintern.value;
      console.log('Submitting form data for update:', formData);
      this.internService.updateIntern(this.intern.id, formData);
      
      this.isSubmitting = false;
      this.onClose();
     
  


    }
  }

  


  editIntern(){


    
  }
    
  

 

  resetForm(): void {
    this.addintern.reset();
   
  }
}
