import { Component } from '@angular/core';
import { WorkerService } from '../../worker.service';
import { Worker } from '../../worker.model';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-worker-profile',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,FormsModule,CommonModule,MatCardModule,MatIconModule], 
  templateUrl: './worker-profile.component.html',
  styleUrl: './worker-profile.component.css'
})
export class WorkerProfileComponent {
  worker: Worker | null = null;

  constructor(
    private workerService: WorkerService,
    private router: Router // Inject Router to navigate
  ) {}
  ngOnInit() {
    this.workerService.worker$.subscribe((worker) => {
      this.worker = worker;
    });

    
  }
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.worker !== null) { // Explicit null check for worker
      const reader = new FileReader();
      reader.onload = () => {
        if (this.worker) {
          this.worker.profileImage = reader.result as string; // Store the base64 string
          console.log('Profile image base64 data:', this.worker.profileImage); // Log base64 data to console
        }
      };
      reader.readAsDataURL(file); // Read the image as base64 string
    }
  }
  
  
  
}