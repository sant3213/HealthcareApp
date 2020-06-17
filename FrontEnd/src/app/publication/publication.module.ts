import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsksComponent } from './askForm-component/asks.component';
import { AngulaMaterialModule } from '../angula-material/angula-material.module';
import { CommentFormComponent } from './commentForm.component/comment-form.component';
import { PublicationComponent } from './publication-component/publication.component';
import { RegisterPublicationComponent } from './register-publication/register-publication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyPublicationComponentComponent } from './my-publication-component/my-publication-component.component';



@NgModule({
  declarations: [AsksComponent, CommentFormComponent, PublicationComponent, RegisterPublicationComponent, MyPublicationComponentComponent],
  imports: [
    CommonModule,
    AngulaMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[AsksComponent,CommentFormComponent,PublicationComponent,RegisterPublicationComponent]
})
export class PublicationModule { }
