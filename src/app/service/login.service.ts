import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public signupuUrl = "https://localhost:44313/api/AppUsers/AddUser";
  public loginUrl = "https://localhost:44313/api/AppUsers/LogIn";
  public adminUrl = "https://localhost:44313/api/AppUsers/IsAdmin";
  public url = "https://localhost:44313/api/AppUsers/FetchAdmin";
  public findNameUrl = "https://localhost:44313/api/AppUsers/FindUser";

  signupService(user: any)
  {
    return this.http.post<any>(this.signupuUrl,user);
  }

  loginService(user: any)
  {
    return this.http.post<any>(this.loginUrl,user);
  }
  adminService(user: any)
  {
    return this.http.post<any>(this.adminUrl,user);
  }

  adminListService()
  {
    return this.http.get(this.url);
  }

  findNameService(data: any)
  {
    return this.http.post<any>(this.findNameUrl,data);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }


}
