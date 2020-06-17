import { Component, OnInit, Input } from '@angular/core';
import { AskService } from '../services/ask-service/ask.service';

@Component({
  selector: 'app-asks',
  templateUrl: './asks.component.html',
  styleUrls: ['./asks.component.css']
})
export class AsksComponent implements OnInit {

  askToShow=[]
  @Input() index: any;

  constructor(private askService: AskService
  ) { }

  ngOnInit() {
    
  }

  
}
