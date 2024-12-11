import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Worker } from '../../worker.model';
import { WorkerService } from '../../worker.service';


@Component({
  selector: 'app-add-work',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,FormsModule,CommonModule,MatCardModule,], 
  templateUrl: './add-work.component.html',
  styleUrl: './add-work.component.css'
})
export class AddWorkComponent {
  isProfileCompleted = false;
  worker: Worker = {
    name: '',
    location: '',
    availability: '',
    phone: '',
    email: '',
    profileImage: '',
    mapsLink: '',
     workDone: '', 
    workImage: '',
    works: [],
   
  };

  constructor(
    private workerService: WorkerService,
    private router: Router
  ) {}
  ngOnInit() {
    // Fetch worker profile from the DB when the component loads
    this.workerService.getWorkers().subscribe(
      (profileData: Worker[]) => {
        if (profileData && profileData.length > 0) {
          // If there is data and the profile exists, take the first worker (or any specific worker)
          this.worker = profileData[0]; // or use profileData.find(worker => worker.id === someId);
          this.isProfileCompleted = true; // Profile already exists
        }
      },
      (error) => {
        console.error('Error fetching profile data', error);
      }
    );
  }
  
  submitProfile() {
    if (this.isProfileCompleted) {
      // If profile is completed, do not submit again
      return;
    }
    this.workerService.addWorker(this.worker).subscribe(
      response => {
        console.log('Profile added', response);
        this.router.navigate(['/profile']);
        this.isProfileCompleted = true;
      },
      error => {
        console.error('Error adding profile', error);
      }
    );
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    console.log('Profile image selected:', file);  // Log the selected file
    if (file) {
      const reader = new FileReader();
  
      reader.onload = () => {
        this.worker.profileImage = reader.result as string;
        console.log('Profile image loaded:', this.worker.profileImage);  // Log the result
        console.log(this.worker.profileImage);
      };
  
      reader.readAsDataURL(file); 
    }
  }
  onWorkImageSelected(event: any) {
    const file = event.target.files[0];
    console.log('Profile image selected:', file);  // Log the selected file
    if (file) {
      const reader = new FileReader();
  
      reader.onload = () => {
        this.worker.workImage = reader.result as string;
        console.log('Profile image loaded:', this.worker.workImage);  // Log the result
        console.log(this.worker.workImage);
      };
  
      reader.readAsDataURL(file); 
    }
  }
  
  
  
  
}