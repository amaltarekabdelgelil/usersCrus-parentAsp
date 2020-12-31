import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UseraccountService } from '../services/account.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    user: User;

    constructor(private accountService: UseraccountService, private router: Router) {
        this.user = this.accountService.userValue;
    }

    ngOnInit(): void {
    }

    goToUsers(){
        this.router.navigate(['/users']);
    }
}