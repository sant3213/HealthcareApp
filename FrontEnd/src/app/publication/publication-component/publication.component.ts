import { Component, OnInit } from '@angular/core';
import { AskService } from '../services/ask-service/ask.service';
import { CommentService } from '../services/comment-service/comment.service';
import { PageEvent } from '@angular/material';
import { Comments } from '../models/comments';
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})

export class PublicationComponent implements OnInit {
  asks=[]
  totalAsks=[];
  askToShow=[];
  comentario:string;
  comment: Comments;
  canComment: boolean;
  pageEvent: PageEvent;
  datasource: null;
  alert:string;
  pageIndex:number;
  pageSize:number;
  length:number=100;
  previousPageIndex:number;
  itemsToShowStartAt:number = 0;
  itemsToShowEndsAt:number = 5;

  constructor(private askService: AskService,
     private commentService:CommentService, 
     private router: Router) { }

  ngOnInit() {
    this.getAllAsks();
    const userData = localStorage.getItem('userAuth');
    const userDataJson = JSON.parse(userData);
    this.canComment = userDataJson.canAccessComments;
  }
  

  getAllAsks() {
    this.askService.getAllAsks().subscribe(resp => {
      resp.treatment.forEach(element => {
        this.totalAsks.push(element)
        this.length = this.totalAsks.length;
      });
      this.askToShow = this.totalAsks.slice(this.itemsToShowStartAt, this.itemsToShowEndsAt);
  })
}

public paginator(event?:PageEvent){
  this.itemsToShowStartAt = (event.pageSize*(event.pageIndex+1))-event.pageSize
  this.itemsToShowEndsAt = event.pageSize*(event.pageIndex+1)
  this.askToShow = this.totalAsks.slice(this.itemsToShowStartAt, this.itemsToShowEndsAt);
  return event;
}

click(value:any){
  const doctor = localStorage.getItem('userAuth');
  const doctorInfo = JSON.parse(doctor);
  this.comment= this.setCommentValues(this.comentario, value, doctorInfo.userName);
  this.commentService.setComment(this.comment).subscribe( rsp => {
    if(rsp.message == 'success'){
     swal.fire('Comentario registrado...', this.alert, 'success');
     window.location.reload();
     this.router.navigate(['/publications']);
    }else{
     swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: 'Algo falló!'
     })
    }
 },
 error=>{
   swal.fire({
     icon: 'error',
     title: 'Oops...',
     text: 'Algo falló!'
   })
 }
)
}

setCommentValues(comentario, publication, id): any {
  const comment: Comments = {
    text: comentario,
    publication: publication,
    user: id
  }
  return comment; 
}
}