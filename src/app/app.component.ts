import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LHIND | Vehicle Rental';
  showLayout: boolean = false;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (['/auth/login',
        '/auth/change-password',
        '/auth/forget-password',
         '/admin'].includes(event['url'])) {
          this.showLayout = false;
        } else {
          this.showLayout = true;
        }
      }
    });
  }
}
