import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  // Mocking data - Normally this would come from an API
  private requestDetails = {
    id: 1,
    userName: 'Juan Dela Cruz',
    paymentStatus: 'Not Yet Paid', // Default payment status
    amount: 500, // Example amount
  };

  private requestDetailsSubject = new BehaviorSubject<any>(this.requestDetails);

  constructor() {}

  // Get the request details from the service
  getRequestDetails() {
    return this.requestDetailsSubject.asObservable();
  }

  // Update payment status locally
  updatePaymentStatus(status: string) {
    this.requestDetails.paymentStatus = status; // Update status in local data
    this.requestDetailsSubject.next(this.requestDetails); // Notify the subscribers
  }
}
