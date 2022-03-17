import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { match, participant } from 'src/app/data';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  subscription!: Subscription;
  out!:string;
  matches!: match;
  gd!:number;
  p:participant[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscription = this.dataService.getMatches().subscribe(value => {
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
      console.log(this.p);
    })
  }

  display() {

  }
}

/*
What to left:
- Add more pages
- Add match blocks
- Add icons
- Organize every block

*/
