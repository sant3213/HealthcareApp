import { Component, OnInit } from '@angular/core';
import { AskService } from '../services/ask-service/ask.service';
import { CommentService } from '../services/comment-service/comment.service';
import { PageEvent } from '@angular/material';
import { Comments } from '../models/comments';
import { parse } from 'querystring';

@Component({
  selector: 'app-my-publication-component',
  templateUrl: './my-publication-component.component.html',
  styleUrls: ['./my-publication-component.component.css']
})
export class MyPublicationComponentComponent implements OnInit {

  asks=[]
  totalAsks=[];
  askToShow=[];
  canComment: boolean;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex:number;
  pageSize:number;
  userData:any
  length:number=100;
  previousPageIndex:number;
  itemsToShowStartAt:number = 0;
  itemsToShowEndsAt:number = 5;
  constructor(private askService: AskService, private commentService:CommentService) { }

  ngOnInit() {
    const userData = localStorage.getItem('userAuth');
    const userDataJson = JSON.parse(userData);
    this.canComment = userDataJson.canAccessComments;
    this.getAllAsks(userDataJson.email);
  }
  
  getAllAsks(email: any) {
    this.askService.getAllAsksByEmail(email).subscribe(resp => {
      resp.treatment.forEach(element => {
        this.totalAsks.push(element)
        this.length = this.totalAsks.length-1;
      });
      this.askToShow = this.totalAsks.slice(this.itemsToShowStartAt, this.itemsToShowEndsAt);
  })
}

public paginator(event?:PageEvent){
  this.itemsToShowStartAt = (event.pageSize*(event.pageIndex+1))-event.pageSize+1
  this.itemsToShowEndsAt = event.pageSize*(event.pageIndex+1)
  this.askToShow = this.totalAsks.slice(this.itemsToShowStartAt, this.itemsToShowEndsAt);
  return event;
}

}
