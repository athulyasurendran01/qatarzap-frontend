import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

   private serverURL = 'http://test1.kraftivo.in/api/v2/';
  //private serverURL = 'http://192.168.1.4/kraftivo/api/v2/';

  constructor(private http: HttpClient, private router:Router){
  }

  apiTokenRequest(url, data): Observable<any> {
    let appurl = this.serverURL+url ;
    return this.http.post(appurl, data);

  }

  apiTokenRequestGet(url): Observable<any> {
    let appurl = this.serverURL+url ;
    return this.http.get(appurl);
  }
  errorRouting(){
    this.router.navigateByUrl("pages/error", { skipLocationChange: true });
  }

  errorChecking(response){
    //console.log(response)
    this.router.navigateByUrl("pages/error", { skipLocationChange: true });
  }
}
