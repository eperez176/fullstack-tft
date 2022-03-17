import { Component, Input, OnInit } from '@angular/core';
import { match, champion, participant} from 'src/app/data';

@Component({
  selector: 'app-match-item',
  templateUrl: './match-item.component.html',
  styleUrls: ['./match-item.component.css']
})
export class MatchItemComponent implements OnInit {
  @Input() p1!:participant;
  @Input() gold!:number;


  constructor() { }

  ngOnInit(): void {
  }

}
