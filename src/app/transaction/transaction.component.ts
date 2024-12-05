import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {
  requestDetails: any; // Store request details
  paymentStatus: string = 'Not Yet Paid'; // Default status
  manualStatus: string = ''; // To show the manual status update

  constructor(private workingRequestService: TransactionService) {}

  ngOnInit(): void {
    // Subscribe to the request details from the service
    this.workingRequestService.getRequestDetails().subscribe((details) => {
      this.requestDetails = details;
      this.paymentStatus = details.paymentStatus; // Update payment status when the details change
    });
  }

  // Function to mark as paid manually
  markAsPaidManually(): void {
    this.workingRequestService.updatePaymentStatus('Payment Successful'); // Update status in service
    this.manualStatus = 'Manually Updated'; // Indicate that the status was manually updated
  }
}
