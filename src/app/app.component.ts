import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { Request } from './request.model';
import { RequestService } from './request.service';
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

  constructor(
    private requestService: RequestService,
    private router: Router
  ) {}

  ngOnInit(): void {

          this.loadUnseenRequests();
     
  }
  

  ngAfterViewInit(): void {
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
    this.unseenRequestsCount = 0;
    this.unseenRequests = [];
  }

  toggleDrawer(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  // Logout method
  logout() {
    // Clear session or authentication data
    localStorage.clear(); // Example: Clearing local storage
    sessionStorage.clear(); // Example: Clearing session storage
    // Redirect to the login page on a different port
    window.location.href = 'http://localhost:59109/login'; // Replace with your login URL
  }
  
}
