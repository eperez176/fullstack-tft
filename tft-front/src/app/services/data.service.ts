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

  constructor(private http: HttpClient) { }

  getMatches():Observable<any> {
    const url = this.baseUrl + "/tft/match/v1/matches/" + "NA1_4244746247" + "?api_key=" + "RGAPI-15a788dd-c675-4080-8a48-7d0187a8c133";
    return this.http.get<any>(url, httpOptions)
  }
}
