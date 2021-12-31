import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public url = "https://localhost:44313/api/Requests/AddRequest";
  public userRequestUrl = "https://localhost:44313/api/Requests/UserRequest";
  public adminRequestUrl = "https://localhost:44313/api/Requests/AdminRequest";
  
  constructor(private http: HttpClient) { }

  requestService(data: any)
  {
    return this.http.post<any>(this.url,data);
  }

  userRequestService(data: any)
  {
    return this.http.post<any>(this.userRequestUrl,data);
  }

  adminRequestService(data: any)
  {
    return this.http.post<any>(this.adminRequestUrl,data);
  }
}
