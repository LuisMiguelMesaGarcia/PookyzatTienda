import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl= 'http://localhost:4201/api/'

  constructor(private http:HttpClient) {
  }

  // async 

}
