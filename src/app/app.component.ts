import { Component, ViewChild, AfterViewInit } from '@angular/core'; 
import { RequestService } from './request.service';
import { Request } from './request.model';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatMenuModule,
    MatSidenav,
FormsModule,
CommonModule,
RouterModule
    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('drawer') drawer: MatSidenav | undefined;
  title = 'skilled-worker-app';
  unseenRequests: Request[] = [];
  unseenRequestsCount = 0;

  constructor(private requestService: RequestService) {}
 

  ngOnInit(): void {
    this.loadUnseenRequests();
  }
  ngAfterViewInit(): void {
    // Ensuring that 'drawer' is available after the view initialization
    if (this.drawer) {
      console.log('Drawer is available');
    } else {
      console.log('Drawer is undefined');
    }
  }
  loadUnseenRequests(): void {
    this.requestService.getUnseenRequests().subscribe((requests: Request[]) => {
      this.unseenRequests = requests;
      this.unseenRequestsCount = requests.length;
    });
  }

  viewRequest(request: Request): void {
    console.log('Viewing request:', request);
    this.requestService.markRequestAsSeen(request.id).subscribe(() => {
      this.unseenRequests = this.unseenRequests.filter((r) => r.id !== request.id);
      this.unseenRequestsCount = this.unseenRequests.length;
    });
  }
  markAllAsSeen(): void {
    console.log('Marking all as seen...');
    this.unseenRequestsCount = 0; // Reset unseen requests count
    this.unseenRequests = []; // Clear unseen requests
  }
  toggleDrawer(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

}
