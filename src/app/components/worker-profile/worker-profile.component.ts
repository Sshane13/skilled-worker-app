import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EditWorkerModalComponent } from '../../edit-worker-modal/edit-worker-modal.component';
import { WorkerService } from '../../worker.service';
 // Import the modal component
@Component({
  selector: 'app-worker-profile',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, CommonModule, MatCardModule, MatIconModule,],
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.css']
})
export class WorkerProfileComponent {
  worker: any = null;
  
  isPosted = false; // Flag to track posting status
  postMessage: string = ''; // Message to display when the worker is posted

  constructor(private workerService: WorkerService, private http: HttpClient,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.workerService.getWorkers().subscribe(
      (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.worker = data[0];
        } else {
          this.worker = data;
          this.isPosted = true; 
        }
      },
      (error) => {
        console.error('Error fetching worker data:', error);
      }
    );
  }

  deleteProfile() {
    if (confirm('Are you sure you want to delete this profile?')) {
      this.workerService.deleteWorkerProfile(this.worker.id).subscribe(
        (response) => {
          alert('Profile deleted successfully.');
          this.worker = null; // Clear the profile or redirect as needed
        },
        (error) => {
          console.error('Error deleting profile', error);
          alert('There was an error deleting the profile.');
        }
      );
    }
  }

  postToUserPage(worker: any): void {
    const postUrl = 'http://localhost/Service_express_api_sw/postWorker.php';
    this.http.post(postUrl, worker).subscribe(
      (response) => {
        console.log('Posted successfully:', response);
        alert('Worker has been posted to the user page!');
        this.isPosted = true; // Lock the button after posting
        this.postMessage = 'This worker has already been posted and cannot be posted again.'; // Display the message
      },
      (error) => {
        console.error('Error posting worker:', error);
        alert('Failed to post the worker.');
      }
    );
  }

openEditModal(): void {
  const dialogRef = this.dialog.open(EditWorkerModalComponent, {
    width: '400px',
    data: { ...this.worker } // Pass the worker data to the modal
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      // Update the worker with the modified data
      this.worker = result;
    }
  });
}
}
