import { Routes } from '@angular/router';
import { WorkerProfileComponent } from './components/worker-profile/worker-profile.component';  // Make sure the path is correct
import { AddWorkComponent } from './components/add-work/add-work.component';
import { CalendarComponent } from './calendar/calendar.component';
import { WorkerRequestListComponent } from './worker-request-list/worker-request-list.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ReportingMessageComponent } from './reporting-message/reporting-message.component';

export const routes: Routes = [
    { path: '', component: WorkerProfileComponent },
    { path: 'add', component: AddWorkComponent },
    { path: 'profile', component: WorkerProfileComponent },
    { path: 'bookings', component: CalendarComponent },
    { path: 'request', component: WorkerRequestListComponent },
    { path: 'transaction', component: TransactionComponent },
    { path: 'report-messages', component: ReportingMessageComponent },
    
    
    // Add other routes as needed
  ];
