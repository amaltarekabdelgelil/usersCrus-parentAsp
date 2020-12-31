import { Component } from '@angular/core';

import { UseraccountService } from './services/account.service';
import { User } from './models/user';
import { HeaderComponent} from './common/header/header.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user: User;
  
  constructor(private accountService: UseraccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  
}
