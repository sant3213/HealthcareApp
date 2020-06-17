import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupTypeComponent } from './popup-type/popup-type.component';
import { AngulaMaterialModule } from '../angula-material/angula-material.module';

@NgModule({
  declarations: [
    PopupTypeComponent
  ],
  imports: [
    CommonModule,
    AngulaMaterialModule
  ],
  exports:[PopupTypeComponent]
})
export class SharedModule { }
