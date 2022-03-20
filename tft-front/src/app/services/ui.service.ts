import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private subject = new BehaviorSubject<string>("default");
  private subjectId = new BehaviorSubject<string>("default");

  constructor() { }

  sentAPI(api:string) {
    this.subject.next(api);
  }
  getAPI() {
    return this.subject.asObservable();
  }
  sentId(id:string){
    this.subjectId.next(id);
  }
  getUserInfo(){
    return this.subjectId.asObservable();
  }
}
