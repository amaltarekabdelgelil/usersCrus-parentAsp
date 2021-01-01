import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

import { UseraccountService } from '../services/account.service';


@Component({ templateUrl: 'add-edit.component.html' })

export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    avatar: any;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: UseraccountService,
        public dialogRef: MatDialogRef<AddEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        // this.id = this.route.snapshot.params['id'];
        if(this.data){
            this.id = this.data['id'];
            this.isAddMode = false;
        }
        else{
            this.isAddMode = true;
        }
        console.log(this.isAddMode)
        
   
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            job: ['', Validators.required],
        });

        if (!this.isAddMode && this.data) {
            this.form.patchValue({name:this.data['data']['first_name'] })
            this.avatar = this.data['data'].avatar;

            // this.accountService.getById(this.id)
            //     .pipe(first())
            //     .subscribe(x => this.form.patchValue(x['data']));
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;


        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.accountService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this._snackBar.open( 'Your User Createsd Succesfully', 'Ok', {
                        duration: 2000,
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        panelClass: "success-dialog"
                    });
                    this.dialogRef.close();
                },
                error: error => {
                    this._snackBar.open( 'Something Wrong', 'Ok', {
                        duration: 2000,
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        panelClass: "danger-dialog"
                    });
                    this.loading = false;
                }
            });
    }

    private updateUser() {
        this.accountService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this._snackBar.open( 'Your User Updated Succesfully', 'Ok', {
                        duration: 2000,
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        panelClass: "success-dialog"
                    });
                    this.dialogRef.close();
                },
                error: error => {
                    this._snackBar.open( 'Something Wrong', 'Ok', {
                        duration: 2000,
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        panelClass: "danger-dialog"
                    });
                    this.loading = false;
                }
            });
    }
}