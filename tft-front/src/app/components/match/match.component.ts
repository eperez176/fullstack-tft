import { Component, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs';
import { info, participant } from 'src/app/data';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  @Input() api!:string;
  @Input() matchName:string = '';

  subscription!: Subscription;
  sub2!:Subscription;
  subType!: Subscription;
  filterType:string = 'all';

  color!:string;
  colorRank!:string;
  placement!:number;
  @Input() puuid!:string;

  gameType!:string;

  p:participant[] = [];
  info:info = {
    game_datetime: 0,
    game_length:0,
    tft_game_type: 'default',
    game_version:'',
    queue_id: 0,
    tft_set_number:0
  };

  clicked: boolean = false;


  constructor(private dataService: DataService, private uiService: UiService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChange){
    this.subType = this.uiService.getType().subscribe(value => this.filterType = value);
    this.sub2 = this.uiService.getAPI().subscribe(value => this.api = value);
      this.subscription = this.dataService.getMatches(this.api, this.matchName).subscribe(value => {
        var i: number;
        var tmpInfo:info ={
          game_datetime : value.info.game_datetime,
          game_length : value.info.game_length,
          tft_game_type : value.info.tft_game_type,
          game_version : value.info.game_version,
          queue_id: value.info.queue_id,
          tft_set_number: value.info.tft_set_number
        }
        //this.updateInfo(tmpInfo);
        this.info = tmpInfo;
        this.color = this.updateColor(this.info.queue_id);
        this.gameType = this.updateGameType(this.info.queue_id);
        // this.colorRank = this.updateRank(this.p);
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
        }
        )
        this.colorRank = this.updateRank(this.p, this.info.queue_id);
        this.placement = this.findPlacement(this.p, this.info.queue_id);
        //console.log(this.info)
        //console.log(this.p)
      })
  }

  colorPlacement(inp:participant):string {
    if(inp.placement == 1)
      return "gold"
    else if(inp.placement == 2)
      return "gray"
    else if(inp.placement == 3)
      return "maroon"
    else if(inp.placement == 4)
      return "aliceblue"
    else
      return "white"
  }
  moreInfo(){
    this.clicked = !this.clicked;
  }
  updateColor(inp:number){ // changed for specific games (ranked/norms)
    if(inp == 1100) // ranked
      return "gold"
    else if(inp == 1090) // norms
      return "khaki"
    else if(inp == 1130) // hyper roll
      return "cyan"
    else if(inp == 1150) // double up
      return "magenta"
    else
      return "white" // error
  }
  updateRank(inp:participant[], queue_id: number){
    var i, j;
    j = 0;
    for(i =0; i < inp.length; i++) {
      //console.log(i.toString + ": " + inp[i].puuid +", " + this.puuid)
      if(inp[i].puuid == this.puuid)
        j = inp[i].placement
    }
    console.log(j);
    if(j == 1 && queue_id != 1150)
      return "goldenrod"
    else if(j == 2 && queue_id != 1150)
      return "gray"
    else if(j == 3 && queue_id != 1150)
      return "maroon"
    else if(j == 4 && queue_id != 1150)
      return "aliceblue"
    else if (j == 5 && queue_id != 1150)
      return "salmon"
    else if (j == 6 && queue_id != 1150)
      return "tomato"
    else if (j == 7 && queue_id != 1150)
      return "red"
    else if(j == 8 && queue_id != 1150)
      return "darkred"
    else if(Math.ceil(j/2) == 1 && queue_id == 1150)
      return "goldenrod"
    else if(Math.ceil(j/2) == 2 && queue_id == 1150)
      return "gray"
    else if(Math.ceil(j/2) == 3 && queue_id == 1150)
      return "tomato"
    else if(Math.ceil(j/2) == 4 && queue_id == 1150)
      return "red"
    else
      return "white"
  }

  findPlacement(inp:participant[], queue_id:number){
    var i, j;
    j = -1;
    for(i=0; i < inp.length; i++){
      if(this.puuid == inp[i].puuid)
        j = inp[i].placement;
    }
    if(queue_id == 1150)
      return Math.ceil(j/2)
    else
      return j
  }

  boxColor(inp:participant){
    if(inp.puuid == this.puuid)
      return "pink"
    else
      return "white"
  }

  updateGameType(inp:number){
    if(inp == 1090)
      return "Normal"
    else if(inp == 1100)
      return "Ranked"
    else if(inp == 1150)
      return "Double Up"
    else if(inp == 1130)
      return "Hyper Roll"
    else
      return "Error"

  }

  display(type:number){
    if(this.filterType == 'all')
      return true;
    else if(this.filterType = 'ranked') {
      if(type == 1100)
        return true;
      else
        return false;
    }
    return false;
  }
}
