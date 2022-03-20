import { Component, OnInit } from '@angular/core';
import { champion } from 'src/app/data';
import { Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  @Input() champions!:champion;
  baseURL: string = "http://tft.nemil.io/icons/champions/";
  @Input() url!: string; // = "http://tft.nemil.io/icons/champions/";
  sub!:Subscription;
  @Input() tier!:number;

  constructor(private uiService:UiService) { }

  ngOnInit(): void {
  }

  update() {
    //this.url = this.baseURL + this.champions.character_id.split("-")[1] + ".jpg";
    //console.log(this.url);
    //console.log("this was pressed")
  }
}
