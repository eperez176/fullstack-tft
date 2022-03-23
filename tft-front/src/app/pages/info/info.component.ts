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
  subMatch!: Subscription;

  p:participant[] = [];
  matches:string[] = [];
  apitemp!:string;
  summoner:summoner = {
    accountId:'',
    profileIconId:0,
    revisionDate:0,
    name:'',
    id:'',
    puuid:'',
    summonerLevel:0
  };
  summonerName!:string;

  leagueEntrySub!:Subscription;
  subPU!:Subscription;
  puuid!:string;
  summonerId!:string;
  subSI!:Subscription;

  subMatchesAll!:Subscription;

  leagueEntry!:leagueEntry;

  constructor(private dataService:DataService, private uiService: UiService) {
    this.sub2 = this.uiService.getAPI().subscribe(value => this.apitemp = value);
    this.subId2 = this.uiService.getUserInfo().subscribe(value => {
      this.summonerName=value;
    });
    this.subSI = this.uiService.getUser().subscribe(value => {this.summonerId = value});
    this.subId = this.dataService.getUserInfo(this.summonerName, this.apitemp).subscribe(value => {
      this.summoner = value;
      this.subMatch = this.dataService.getAllMatches(this.apitemp, this.summoner.puuid).subscribe(value => {
        this.matches = value;
        var i = 0;
        console.log(this.matches.length);
        for(i = 0; i < this.matches.length; i++)
          this.subMatchesAll = this.dataService.getMatches(this.apitemp).subscribe(value => console.log(value));
      });
      //this.uiService.sentUser(this.summoner.id);
    });


    this.leagueEntrySub = this.dataService.getLeagueEntry(this.summonerId,this.apitemp).subscribe(value => {
      this.leagueEntry = value;
      console.log(value)
      console.log("At LE:"+this.summonerId)
      console.log(this.leagueEntry);
    });

  }

  ngOnInit(): void {
  }

}
