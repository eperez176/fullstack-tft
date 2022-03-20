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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

}

/*
What to left:
- Add more pages
- Add match blocks
- Add icons
- Organize every block

*/
