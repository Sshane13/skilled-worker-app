import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestCalendarService {

  // Create a BehaviorSubject to store the calendar events
  private eventsSubject = new BehaviorSubject<any[]>([]);
  events$ = this.eventsSubject.asObservable();

  constructor() {}

  // Method to approve a request and add it to the calendar
  approveRequest(request: any) {
    const event = {
      title: request.service,
      start: new Date(request.date + 'T09:00:00'),
      end: new Date(request.date + 'T11:00:00'),
      status: 'Booked',
      extendedProps: {
        status: 'Booked',
        requestId: request.id
      }
    };

    // Get the current events
    const currentEvents = this.eventsSubject.getValue();

    // Add the new event to the current list of events
    currentEvents.push(event);

    // Update the events in the BehaviorSubject
    this.eventsSubject.next(currentEvents);
  }

  // Method to get current events (optional, but useful for initial load)
  getEvents() {
    return this.eventsSubject.getValue();
  }
}
