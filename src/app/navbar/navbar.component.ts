import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { RequestService } from '../service/request.service';
import { TypeService } from '../service/type.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public rType: string = "Type";
  public rTypeId: number = 0;
  public ResourceTypeList: any = [];
  public Description: string = "";
  public ResourceType: string = "";
  public EmpEmail: string = "";
  public Status: boolean = false;
  public requestToName: string = "Admin Name";
  public requestTo: string = "";
  public RequestToList: any = [];
  public empName!: string;


  constructor(private type: TypeService,private request: RequestService, private user: LoginService) { 
    this.user.findNameService({EmpEmail : localStorage.getItem('currentUser')}).subscribe((res: any) => {
      console.log(res);
      this.empName = res[0].empName;
    },
    (err: any) => {
      console.log("Something went wrong");
    })
  }

  ngOnInit(): void {
    
  }

  getData()
  {
    this.type.getTypeService().subscribe((res: any) => {
      console.log(res);
      this.ResourceTypeList = res;
    },
    (err: any) => {
      console.log("Something Went Wrong");
    })
    this.user.adminListService().subscribe((res: any) => {
      this.RequestToList = res;
      console.log(res);
    },
    (err: any) => {
      console.log("Something Went Wrong");
    })
    this.rType = "Type";
    this.Description = "";
    this.requestToName = "Admin Name";
  }

  updateData(dropDownData: any)
  {
    this.rType=dropDownData.rTypeName;
    this.rTypeId=dropDownData.rTypeId;
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');

    return false;
  }

  requestResource(formValue: any)
  {
    formValue.Status = false;
    formValue.EmpEmail = localStorage.getItem('currentUser');
    console.log(formValue);
    this.request.requestService(formValue).subscribe((res: any) => {
      if(res){
        alert("Request successfully submitted!!")
      }
    },
    (err: any) => {
      alert("Some Error!! Try Again")
    })
  }

  updateRequest(dropDownData: any)
  {
    this.requestTo = dropDownData.empId;
    this.requestToName = dropDownData.empName;
  }

}
