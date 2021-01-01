import { Component, OnInit } from '@angular/core';
import { UseraccountService } from '../../services/account.service';
import { User } from '../../models/user';


@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html'
  })

  export class BreadcrumbComponent implements OnInit {

    user: User;
    
    constructor(private accountService: UseraccountService) {
      this.accountService.user.subscribe(x => this.user = x);
    }

    ngOnInit(): void {}

  }