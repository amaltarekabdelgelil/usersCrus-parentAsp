import { NgModule } from '@angular/core';

import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { FormsModule } from '@angular/forms';


@NgModule({
    exports: [FormsModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule,MatPaginatorModule,
      MatSnackBarModule, MatSidenavModule],

    imports: [
      MatSidenavModule
    ]
  })
  
  export class MaterialModule {}

  