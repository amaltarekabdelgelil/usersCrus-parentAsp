import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { MatSidenav} from '@angular/material/sidenav';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { first } from 'rxjs/operators';
import { UseraccountService } from '../../services/account.service';
import { AddEditComponent } from '../add-edit.component'


@Component({ 
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'] 
})

export class ListComponent implements OnInit {
    users = null;
    showFiller = false;
    title = 'CRS';
    @ViewChild('sidenav') sidenav: MatSidenav;
    @Input()
mode: 'over' | 'push' | 'side'

    constructor(private accountService: UseraccountService, public dialog: MatDialog) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users['data']);
            console.log(this.users)
            
    }

    toggle() {
      this.sidenav.toggle();
    }

    confirmDialog(userObj): void {
      const message = `${userObj.first_name}  ${userObj.last_name}`;
  
      const dialogData = new ConfirmDialogModel("Are you sure you want to delete?", message);
  
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: "400px",
        data: dialogData
      });
  
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          console.log('yyyy')
          const user = this.users.find(x => x.id === userObj.id);
          user.isDeleting = true;
          this.accountService.delete(userObj.id)
              .pipe(first())
              .subscribe(() => this.users = this.users.filter(x => x.id !== userObj.id));
          }
      });
    }

    openEditUser(id,user): void {
      const dialogRef = this.dialog.open(AddEditComponent, {
        width: '400px',
        height: '340px',
        data: {id:id,data:user}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      });
    }

    openAddUser(): void {
      const dialogRef = this.dialog.open(AddEditComponent, {
        width: '400px',
        height: '340px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        // this.email = result;
      });
    }



}