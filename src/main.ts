import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),         // Ensure the routes are provided
    provideAnimationsAsync(),      // Provide animations
    provideHttpClient(),          // Provide HttpClient
  ],
}).catch((err) => console.error(err));
