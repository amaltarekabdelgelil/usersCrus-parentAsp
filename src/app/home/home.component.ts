import { Component } from '@angular/core';

import { User } from '../models/user';
import { UseraccountService } from '../services/account.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;

    constructor(private accountService: UseraccountService) {
        this.user = this.accountService.userValue;
    }
}