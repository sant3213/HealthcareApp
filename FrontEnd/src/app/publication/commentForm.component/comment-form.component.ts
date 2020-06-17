import { Component, OnInit, Input } from '@angular/core';
import { AskService } from '../services/ask-service/ask.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  askToShow=[]
  @Input() index: any;
  constructor(private askService: AskService) { }

  ngOnInit() { }
}
