import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { match, participant, summoner } from 'src/app/data';
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

  constructor(private dataService:DataService, private uiService: UiService) {
    this.sub2 = this.uiService.getAPI().subscribe(value => this.apitemp = value);
    this.subId2 = this.uiService.getUserInfo().subscribe(value => {this.summonerName=value;});
    this.subId = this.dataService.getUserInfo(this.summonerName, this.apitemp).subscribe(value => {
      this.summoner = value;
      console.log(this.summoner);
    })

    this.subscription = this.dataService.getMatches(this.apitemp).subscribe(value => {
      var i: number;
      for(i=0; i<8; i++) {
        const tempP: participant = {
          augment: [],
          gold_left: 0,
          last_round: 0,
          level: 0,
          placement: 0,
          players_eliminated: 0,
          time_eliminated: 0,
          total_damage_to_players: 0,
          traits: [],
          units: []
        };
          
        tempP.augment = value.info.participants[i].augment;
        tempP.gold_left = value.info.participants[i].gold_left;
        tempP.last_round = value.info.participants[i].last_round;
        tempP.level = value.info.participants[i].level;
        tempP.placement = value.info.participants[i].placement;
        tempP.players_eliminated = value.info.participants[i].players_eliminated;
        tempP.time_eliminated = value.info.participants[i].time_eliminated;
        tempP.total_damage_to_players = value.info.participants[i].total_damage_to_players;
        tempP.traits = value.info.participants[i].traits;
        tempP.units = value.info.participants[i].units;

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
      console.log(this.p);
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
