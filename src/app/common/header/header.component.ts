import { Component, OnInit } from '@angular/core';
import { UseraccountService } from '../../services/account.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User;
    
    constructor(private accountService: UseraccountService) {
      this.accountService.user.subscribe(x => this.user = x);
    }
  
    logout() {
        this.accountService.logout();
    }

  ngOnInit(): void {
  }

}
