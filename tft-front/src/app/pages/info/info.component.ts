import { Component, OnInit, Output, EventEmitter, SimpleChange} from '@angular/core';
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
  @Output() displayType:string ='all';

  leagueEntrySub!:Subscription;
  entryUI!: Subscription;

  subPU!:Subscription;
  puuid!:string;
  summonerId!:string;
  subSI!:Subscription;

  subMatchesAll!:Subscription;

  leagueEntry:leagueEntry = {
    leagueId: '',
    summonerId: '',
    summonerName: '',
    queueType:'',
    ratedTier: '',
    ratedRating: 0,
    tier: '',
    rank: '',
    leaguePoints: 0,
    wins: 0,
    losses: 0,
    hotStreak: false,
    veteran: false,
    freshBlood: false,
    inactive: false
  };

  constructor(private dataService:DataService, private uiService: UiService) {
    this.sub2 = this.uiService.getAPI().subscribe(value => this.apitemp = value); // Obtain the API key
    this.subId2 = this.uiService.getUserInfo().subscribe(value => {
      this.summonerName = value;
      this.subSI = this.dataService.getUserInfo(value, this.apitemp).subscribe(value => {// Summoner ID
        this.summonerId = value.id;
        console.log(value)
        this.leagueEntrySub = this.dataService.getLeagueEntry(value.id, this.apitemp).subscribe(value => {
          this.uiService.sentLeagueEntry(value);
        })
      });
    }); // Obtain summoner name 
    this.subId = this.dataService.getUserInfo(this.summonerName, this.apitemp).subscribe(value => { // Obtain matches
      this.summoner = value;
      this.subMatch = this.dataService.getAllMatches(this.apitemp, this.summoner.puuid).subscribe(value => {
        this.matches = value;
      });
      //this.uiService.sentUser(this.summoner.id);
    });


    // this.leagueEntrySub = this.dataService.getLeagueEntry(this.summonerId,this.apitemp).subscribe(value => {
    //   this.leagueEntry = value;
    //   console.log(value)
    //   console.log("At LE:"+this.summonerId)
    //   console.log(this.leagueEntry);
    // });

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes:SimpleChange){
    this.entryUI = this.uiService.getEntry().subscribe(value => console.log(value));
  }

  updateType(){
    this.uiService.sendType(this.displayType);
  }

}
