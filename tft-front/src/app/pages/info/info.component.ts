import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { leagueEntry, match, participant, summoner } from 'src/app/data';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  subscription!:Subscription;
  subId2!:Subscription;
  subId!: Subscription;
  sub2!: Subscription;
  p:participant[] = [];
  apitemp!:string;
  summoner!:summoner;
  summonerName!:string;

  leagueEntrySub!:Subscription;
  subPU!:Subscription;
  puuid!:string;
  summonerId!:string;
  subSI!:Subscription;

  leagueEntry!:leagueEntry;

  constructor(private dataService:DataService, private uiService: UiService) {
    this.sub2 = this.uiService.getAPI().subscribe(value => this.apitemp = value);
    this.subId2 = this.uiService.getUserInfo().subscribe(value => {
      this.summonerName=value;
    });
    this.subSI = this.uiService.getUser().subscribe(value => {this.summonerId = value});
    this.subId = this.dataService.getUserInfo(this.summonerName, this.apitemp).subscribe(value => {
      this.summoner = value;
      //console.log(this.summoner.id);
      this.uiService.sentUser(this.summoner.id);
    });


    this.leagueEntrySub = this.dataService.getLeagueEntry(this.summonerId,this.apitemp).subscribe(value => {
      this.leagueEntry = value;
      console.log(value)
      console.log("At LE:"+this.summonerId)
      console.log(this.leagueEntry);
    });

    this.subscription = this.dataService.getMatches(this.apitemp).subscribe(value => {
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

}
