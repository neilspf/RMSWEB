import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  public url = "https://localhost:44313/api/Types/FetchType";

  constructor(private http: HttpClient) { }

  getTypeService()
  {
    return this.http.get(this.url);
  }

}
