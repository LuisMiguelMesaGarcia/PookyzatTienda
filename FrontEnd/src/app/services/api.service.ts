import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
 

  constructor(public http:HttpClient) {}
  
  public apiUrl= 'http://localhost:4201/api/';


public getAll(controller:string):Observable<any>{
  return this.http.get(this.apiUrl+controller)
}


public post(controller: string, body:any):Observable<any>{
  return this.http.post(this.apiUrl+controller, body)
}

  // async getAll(controller: string){
  //   var response: any;
  //   console.log(controller)
  //   await this.http.get(this.apiUrl+controller).subscribe(res=>{
  //     response=res;
  //   })
  //   return response;
  // }

}
