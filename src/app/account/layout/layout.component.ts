import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UseraccountService } from '../../services/account.service';


@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private accountService: UseraccountService
    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }
}