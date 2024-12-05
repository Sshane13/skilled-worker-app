import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Worker {
  name: string;
  location: string;

  availability?: string;
  phone?: string;
  email?: string;
  profileImage?: string;
  works: any[];
  mapsLink?: string
}

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  // Update the worker initialization to include the new properties
  private worker = new BehaviorSubject<Worker>({
    name: '',
    location: '',
    availability: '',
    phone: '',
    email: '',
    profileImage: '', // Initialize profileImage
    works: [], // Default empty works array
    mapsLink: '',
  });

  worker$ = this.worker.asObservable();

  updateWorker(updatedWorker: Worker) {
    this.worker.next(updatedWorker); // Update the worker
  }

  getWorker() {
    return this.worker.value; // Get the current worker value
  }
}
