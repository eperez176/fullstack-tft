import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  id!:string;
  label!: string;
  @Output() apiName:EventEmitter<string> = new EventEmitter();
  
  apiKey!:string;

  constructor(private fb:FormBuilder, private uiService:UiService, private router:Router) { }


  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.id || !this.apiKey)
      alert('Empty Field!');
    else
    {
      this.uiService.sentAPI(this.apiKey);
      this.uiService.sentId(this.id);
      this.router.navigate(['/info']);
      console.log("pressed")
    }
      
  }

}
