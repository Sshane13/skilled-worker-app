import { Component } from '@angular/core';
import { Worker } from '../../worker.model';
import { WorkerService } from '../../worker.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-work',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,FormsModule,CommonModule,MatCardModule,], 
  templateUrl: './add-work.component.html',
  styleUrl: './add-work.component.css'
})
export class AddWorkComponent {
  worker: Worker = {
    name: '',
    location: '',
    availability: '',
    phone: '',
    email: '',
    profileImage: '',
    mapsLink: '',
    works: [],
  };

  constructor(
    private workerService: WorkerService,
    private router: Router // Inject Router to navigate
  ) {}

submitProfile() {
  // Update the worker data in the service
  this.workerService.updateWorker(this.worker);

  // Log the worker data to the console for verification
  console.log('Updated worker data:', this.worker);

  // Navigate to the profile component
  this.router.navigate(['/profile']); // Adjust the route as needed
}
onImageSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      this.worker.profileImage = reader.result as string; // Store the base64 string
    };

    reader.readAsDataURL(file); // Read the image as base64 string
  }
}
}
