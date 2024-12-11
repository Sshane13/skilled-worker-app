import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { RequestCalendarService } from '../requestcalendar.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
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
      description: 'Patient needs urgent medical help.',
      proposedCost: null,
      messageToUser: '',
      showMessageModal: false,
      mapsLink: '',
      userPicture: 'https://via.placeholder.com/150'
    },
    {
      id: '2',
      name: 'Jane Smith',
      date: '2024-12-02',
      service: 'Electrical',
      status: 'Pending',
      description: 'Patient needs urgent medical help.',
      proposedCost: null,
      messageToUser: '',
      showMessageModal: false,
      mapsLink: '',
      userPicture: 'https://via.placeholder.com/150'
    }
  ];

  selectedRequest: any;

  constructor(
    private requestService: RequestService,
    private router: Router,
    private requestCalendarService: RequestCalendarService // Inject the service
  ) {}
  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    // Load requests if needed
  }

  onMessage(request: any) {
    request.showMessageModal = true;
    this.selectedRequest = request;
  }
  openModal(request: any): void {
    this.selectedRequest = request;
  }
  closeModal(): void {
    this.selectedRequest = null;
  }

  closeMessageModal() {
    if (this.selectedRequest) {
      this.selectedRequest.showMessageModal = false;
    }
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
  private updateRequestStatus(requestId: string, status: string) {
    const request = this.requests.find(req => req.id === requestId);
    if (request) {
      request.status = status;
     
    }
  }


  onDecline(requestId: string) {
    const request = this.requests.find(req => req.id === requestId);
    if (request) {
      request.status = 'Declined';
      console.log(`Request ${requestId} is now Declined`);
    }
  }

  onViewRequest(request: any) {
    this.selectedRequest = request;
  }

  sendMessage(request: any) {
    const message = `The proposed cost for your service is ${request.proposedCost}. Please confirm if you agree to this cost.`;
    console.log('Message sent:', message);
    request.status = 'Message Sent';
  }
}
