import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoComponent } from './pages/info/info.component';
import { MatchItemComponent } from './components/match-item/match-item.component';
import { SearchComponent } from './components/search/search.component';
import { UnitComponent } from './components/unit/unit.component';
import { AugmentComponent } from './components/augment/augment.component';
import { MatchComponent } from './components/match/match.component';
import { HeaderComponent } from './components/header/header.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'info', component: InfoComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent,
    MatchItemComponent,
    SearchComponent,
    UnitComponent,
    AugmentComponent,
    MatchComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{enableTracing: false}),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
