import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import { MatDialog } from '@angular/material/dialog';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RequestCalendarService } from '../requestcalendar.service';
 // Import the service

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, MatCardModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit { 
  @ViewChild('calendar') calendar: any;  
  calendarOptions!: CalendarOptions;
  selectedEvent: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private requestCalendarService: RequestCalendarService 
  ) {}

  ngOnInit(): void {
    // Subscribe to the events from the service
    this.requestCalendarService.events$.subscribe(events => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: events,  // Use the events from the service
        plugins: [dayGridPlugin, interactionPlugin],
        editable: true,
        selectable: true,
        dateClick: (info) => this.onDateClick(info),
        eventClick: this.onEventClick.bind(this),
        eventDrop: (info) => this.onEventDrop(info),
      };
    });
  }

  ngAfterViewInit(): void {
    if (this.calendar) {
      const calendarApi = this.calendar.getApi();  // Get FullCalendar API instance
      calendarApi.refetchEvents();  // Refresh the calendar view
    }
  }

  onDateClick(info: any) {
    // Check if events is an array and find if an event already exists at the selected date
    const eventsArray = Array.isArray(this.calendarOptions.events) ? this.calendarOptions.events : [];
    
    const existingEvent = eventsArray.find((event: any) => 
      event.start === info.dateStr + 'T09:00:00' // Compare the exact date-time format here
    );
  
    if (existingEvent) {
      // Notify the user that the time is already booked
      alert('This time slot is already booked. Please choose a different time.');
    } else {
      const title = prompt('Enter the booking title:');
      if (title) {
        const newEvent = {
          title,
          start: info.dateStr + 'T09:00:00',  // Example time, you can change this
          end: info.dateStr + 'T11:00:00',  // Example end time, you can change this
          status: 'Available',
          extendedProps: {
            status: 'Available'
          }
        };
  
        // Add event to FullCalendar
        if (this.calendar) {
          const calendarApi = this.calendar.getApi();
          calendarApi.addEvent(newEvent);
          calendarApi.refetchEvents();
        }
      }
    }
  }
  

  onEventClick(event: any) {
    this.selectedEvent = event.event;
    console.log('Clicked event:', this.selectedEvent);
  }

  onEventDrop(info: any) {
    info.event.setExtendedProp('status', 'Moved');
  }


    onDatesRender(event: any) {
      console.log('Dates rendered:', event);
    }
    // Correctly typed `info` argument for eventClick
  
    toggleAvailability(event: any) {
      if (event.extendedProps.status === 'Available') {
        event.setExtendedProp('status', 'Unavailable');
      } else {
        event.setExtendedProp('status', 'Available');
      }
      this.selectedEvent = event;
    }
  }


