import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { participant } from 'src/app/data';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  @Input() api!:string;

  subscription!: Subscription;
  sub2!:Subscription;

  p:participant[] = [];

  clicked: boolean = false;


  constructor(private dataService: DataService, private uiService: UiService) {

    this.sub2 = this.uiService.getAPI().subscribe(value => this.api = value);

    this.subscription = this.dataService.getMatches(this.api).subscribe(value => {
      var i: number;
      for(i=0; i<8; i++) {

        const tempP:participant = value.info.participants[i];
        this.p.push(tempP);
      }
      this.p = this.p.sort((a,b) => {
        if(a.placement > b.placement)
          return 1;
        else if(a.placement < b.placement)
          return -1;
        else
          return 0;
      })
      //console.log(this.p)
    })
  }

  ngOnInit(): void {
  }

  colorPlacement(inp:participant):string {
    if(inp.placement == 1)
      return "gold"
    else if(inp.placement == 2)
      return "gray"
    else if(inp.placement == 3)
      return "maroon"
    else if(inp.placement == 4)
      return "navy"
    else
      return "aliceblue"
  }
  moreInfo(){
    this.clicked = !this.clicked;
  }

}
