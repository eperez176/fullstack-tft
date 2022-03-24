import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders (
    {
      'Content-Type': 'application/json'
    }
  )
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = "https://americas.api.riotgames.com";
  baseUrl2 = "https://na1.api.riotgames.com"

  constructor(private http: HttpClient) { }

  getMatches(api: string, matchName:string):Observable<any> {
      const url = this.baseUrl + "/tft/match/v1/matches/" + matchName + "?api_key=" + api;
      return this.http.get<any>(url, httpOptions)

  }
  getUserInfo(id:string, api:string):Observable<any> {
    const url = this.baseUrl2 + "/tft/summoner/v1/summoners/by-name/" + id +"?api_key=" + api
    return this.http.get<any>(url, httpOptions);
  }
  getLeagueEntry(id:string, api:string):Observable<any> {
    const url = this.baseUrl2 + "/tft/league/v1/entries/by-summoner/" + id + "?api_key=" + api;
    return this.http.get<any>(url,httpOptions);
  }

  getAllMatches(api:string,puuid:string){
    const url = this.baseUrl + "/tft/match/v1/matches/by-puuid/" + puuid+"/ids"+"?api_key=" + api;
    return this.http.get<any>(url, httpOptions);
  }
}
