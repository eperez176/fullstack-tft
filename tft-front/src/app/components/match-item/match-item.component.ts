import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { match, champion, participant} from 'src/app/data';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-match-item',
  templateUrl: './match-item.component.html',
  styleUrls: ['./match-item.component.css']
})
export class MatchItemComponent implements OnInit {
  @Input() p1!:participant;
  @Input() gold!:number;
  @Input() color!:string;
  @Input() placement!: string;
  @Input() gameType!:number;
  subject1: Subject<void> = new Subject<void>(); 

  subType!: Subscription;
  filterType: string = 'all';

  

  constructor(private uiService:UiService) {

   }

  ngOnInit(): void {
  }

  update(inp:champion): string {
    if(inp.character_id == "TFT6_TahmKench")
      return ("http://tft.nemil.io/icons/champions/" + "Tahm_Kench"+ ".jpg")
    else if(inp.character_id == "TFT6_KhaZix")
      return ("http://tft.nemil.io/icons/champions/" + "Khazix"+ ".jpg")
    else if(inp.character_id == "TFT6b_Vi")
      return ("http://tft.nemil.io/icons/champions/" + "Vi"+ ".jpg")
    else if(inp.character_id == "TFT6_ChoGath")
      return ("http://tft.nemil.io/icons/champions/" + "Chogath"+ ".jpg")
    else if(inp.character_id == "TFT6_Renata")
      return ("http://tft.nemil.io/icons/champions/" + "Renata_Glasc"+ ".jpg")
    else if(inp.character_id == "TFT6_MissFortune")
      return ("http://tft.nemil.io/icons/champions/" + "Miss_Fortune"+ ".jpg")
    return ("http://tft.nemil.io/icons/champions/" + inp.character_id.split("_")[1]+ ".jpg")
    
  }

  remove(inp:string) {
    return (inp.split("Augment_"))[1]
  }
}
