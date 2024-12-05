import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { RequestCalendarService } from '../requestcalendar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Import the service

@Component({
  standalone:true,
  imports: [CommonModule,FormsModule],
  selector: 'app-worker-request-list',
  templateUrl: './worker-request-list.component.html',
  styleUrls: ['./worker-request-list.component.css']
})
export class WorkerRequestListComponent implements OnInit {

  requests = [
    {
      id: '1',
      name: 'John Doe',
      date: '2024-12-01',
      service: 'Plumbing',
      status: 'Pending',
    },
    {
      id: '2',
      name: 'Jane Smith',
      date: '2024-12-02',
      service: 'Electrical',
      status: 'Pending',
    },
    {
      id: '3',
      name: 'Samuel Johnson',
      date: '2024-12-03',
      service: 'Carpentry',
      status: 'Pending',
    }
  ];

  constructor(
    private requestService: RequestService,
    private router: Router,
    private requestCalendarService: RequestCalendarService // Inject the service
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    // Load requests if necessary
  }

  onApprove(requestId: string) {
    const request = this.requests.find(req => req.id === requestId);
    if (request) {
      this.updateRequestStatus(requestId, 'Approved');

      // Use the service to approve the request and add it to the calendar
      this.requestCalendarService.approveRequest(request);

      // Navigate to the Calendar component (optional, if needed)
      this.router.navigate(['/bookings']);
    }
  }

  onDecline(requestId: string) {
    this.updateRequestStatus(requestId, 'Declined');
  }

  private updateRequestStatus(requestId: string, status: string) {
    const request = this.requests.find(req => req.id === requestId);
    if (request) {
      request.status = status;
      console.log(`Request ${requestId} is now ${status}`);
    }
  }
}
