import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { leagueEntry } from '../data';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private subject = new BehaviorSubject<string>("default");
  private subjectId = new BehaviorSubject<string>("default");
  private subjectUser = new BehaviorSubject<string>("default");
  private subjectType = new BehaviorSubject<string>("all");
  private subjectEntry = new BehaviorSubject<leagueEntry>({
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
  });

  constructor() { }

  // Api handling
  sentAPI(api:string) {
    this.subject.next(api);
  }
  getAPI() {
    return this.subject.asObservable();
  }

  // IGN handling
  sentId(id:string){
    this.subjectId.next(id);
  }
  getUserInfo(){
    return this.subjectId.asObservable();
  }

  // User info
  sentUser(id:string){
    //console.log("at sentUser:"+id)
    this.subjectUser.next(id);
  }
  getUser(){
    //console.log("Getting userID")
    return this.subjectUser.asObservable();
  }

  // Sent display fiter
  sendType(inp:string){
    this.subjectType.next(inp);
  }
  getType(){
    return this.subjectType.asObservable();
  }

  sentLeagueEntry(entry:leagueEntry){
    this.subjectEntry.next(entry)
  }
  getEntry(){
    return this.subjectEntry.asObservable();
  }
}
