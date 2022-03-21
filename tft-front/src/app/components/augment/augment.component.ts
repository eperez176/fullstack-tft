import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-augment',
  templateUrl: './augment.component.html',
  styleUrls: ['./augment.component.css']
})
export class AugmentComponent implements OnInit {
  @Input() augment!:string;

  constructor() { }

  ngOnInit(): void {
  }

}
