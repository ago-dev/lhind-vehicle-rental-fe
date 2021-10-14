import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LoginModel } from './core/model/res/login.model';
import { AuthenticationService } from './core/service/authetication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LHIND | Vehicle Rental';
  showLayout: boolean = false;
  currentUser!:LoginModel;
  constructor(private router: Router,private authService:AuthenticationService) {
    this.authService.currentUser.subscribe(u=>this.currentUser=u);
/*     if(!this.currentUser){
      this.router.navigate(["/auth"]);
    } */
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
