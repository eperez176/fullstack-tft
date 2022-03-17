import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoComponent } from './pages/info/info.component';
import { MatchItemComponent } from './components/match-item/match-item.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'info', component: InfoComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent,
    MatchItemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{enableTracing: false}),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
