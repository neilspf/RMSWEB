import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  public url = "https://localhost:44313/api/Resources/GetResources";
  public serachUrl = "https://localhost:44313/api/Resources/SearchResources";
  public addUrl = "https://localhost:44313/api/Resources/AddResource";
  public userResourceUrl = "https://localhost:44313/api/Resources/UserResources";
  public countResourceUrl ="https://localhost:44313/api/Resources/CountResource";
  public CountResourceByType ="https://localhost:44313/api/Resources/ResourceByType"

  constructor(private http: HttpClient) { }

  resourceService(type: any)
  {
    return this.http.post<any>(this.url,type);
  }

  searchResourceService(type: any)
  {
    return this.http.post<any>(this.serachUrl,type);
  }

  addService(type: any)
  {
    return this.http.post<any>(this.addUrl,type);
  }

  userResourceService(type: any)
  {
    return this.http.post<any>(this.userResourceUrl,type);
  }
  countResourceService(){
    return this.http.get<any>(this.countResourceUrl);
  }
  countResourceServiceByType(){
    return this.http.get<any>(this.CountResourceByType);
  }
}
