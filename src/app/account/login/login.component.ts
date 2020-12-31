import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UseraccountService } from '../../services/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  iserror:any;


  constructor( private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
    private accountService: UseraccountService) { 

    }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }
    
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    
      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.accountService.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe({
              next: (res) => {
                  // get return url from query parameters or default to home page
                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                  this.router.navigateByUrl(returnUrl);
              },
              error: error => {
                  this.iserror = error.error.error;
                  console.log(this.iserror)
                }
          });
  }

  handleKeyUp(e){
    if(e.keyCode === 13){
       this.onSubmit();
    }
 }

}
