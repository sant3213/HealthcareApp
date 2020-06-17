import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule, 
  MatCardModule, 
  MatInputModule, 
  MatIconModule, 
  MatSelectModule,
   MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatExpansionModule,
    MatPaginatorModule} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MatToolbarModule,
     MatCardModule,
      MatInputModule,
       MatIconModule,
        MatSelectModule,
         MatDialogModule,
         MatButtonModule,
         MatTabsModule,
         MatExpansionModule,
         MatPaginatorModule
        ]
})
export class AngulaMaterialModule { }
