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

  color!:string;
  colorRank!:string;
  placement!:number;
  @Input() puuid!:string;

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
        this.color = this.updateColor(this.info.tft_game_type);
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
        this.colorRank = this.updateRank(this.p);
        this.placement = this.findPlacement(this.p);
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
      return "navy"
    else
      return "aliceblue"
  }
  moreInfo(){
    this.clicked = !this.clicked;
  }
  updateColor(inp:string){
    if(inp == "standard")
      return "gold"
    else if(inp == "turbo")
      return "cyan"
    else if(inp == "pairs")
      return "magenta"
    else
      return "white"
  }
  updateRank(inp:participant[]){
    var i, j;
    for(i =0; i < inp.length; i++) {
      //console.log(i.toString + ": " + inp[i].puuid +", " + this.puuid)
      if(inp[i].puuid == this.puuid)
        j = inp[i].placement
    }
    console.log(j);
    if(j == 1)
      return "goldenrod"
    else if(j == 2)
      return "gray"
    else if(j == 3)
      return "maroon"
    else if(j == 4)
      return "aliceblue"
    else if(j == 8)
      return "red"
    else
      return "white"
  }

  findPlacement(inp:participant[]){
    var i;
    for(i=0; i < inp.length; i++){
      if(this.puuid == inp[i].puuid)
        return inp[i].placement;
    }
    return -1;
  }
}
