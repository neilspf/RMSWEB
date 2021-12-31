import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { ResourceService } from '../service/resource.service';
import { TypeService } from '../service/type.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  public rType: string = "Type";
  public rTypes: string = "Type";
  public rTypeId: number = 0;
  public ResourceTypeList: any = [];
  public ResourceData!: any[];
  public TempResourceTypeList: any = [];
  objectKeys = Object.keys;
  public show: boolean = false;
  public isAdmin: boolean = false;
  public values:string = ''
  public pDate: string = '';

  parameters :any[] = ["ResourceName", "MacID","SerialID"]

  constructor(private type: TypeService, private resource: ResourceService, private user: LoginService) {
    this.checkAdmin();
   }

  ngOnInit(): void { 
  }

  getType()
  {
    this.type.getTypeService().subscribe((res: any) => {
      //console.log(res);
      this.TempResourceTypeList = res;
      this.ResourceTypeList = [{rTypeId: 0, rTypeName: 'All'}];
      this.ResourceTypeList = this.ResourceTypeList.concat(res);
    },
    (err: any) => {
      console.log("Something Went Wrong");
    })
  }

  checkAdmin()
  {
    this.user.adminService({EmpEmail:localStorage.getItem('currentUser')}).subscribe((res: any) => {
      this.isAdmin = res;
      if(res == true)
      {
        this.getType();
        this.getResourceGrid({});
      }
      else
      {
        this.getUserResource();
      }
    },
    (err: any) => {
      console.log("Something Went Wrong");
    })
  }

  updateData(dropDownData: any)
  {
    this.rType=dropDownData.rTypeName;
    this.rTypeId=dropDownData.rTypeId;
    this.getResourceGrid(dropDownData);
  }

  updateType(dropDownData: any)
  {
    this.rTypes=dropDownData.rTypeName;
    this.rTypeId=dropDownData.rTypeId;
  }

  getUserResource()
  {
    this.resource.userResourceService({EmpEmail:localStorage.getItem('currentUser')}).subscribe((res: any) => {
      console.log(res);
      this.ResourceData = res;
      if(res!=0)
      {
        this.show=true;
      }
      else
      {
        this.show=false;
      }
    },
    (err: any) => {
      console.log("Something went wrong");
    })
  }

  getResourceGrid(data: any)
  {
    this.resource.resourceService(data).subscribe((res: any) => {
      //console.log(res);
      this.ResourceData = res;
      if(res!=0)
      {
        this.show=true;
      }
      else
      {
        this.show=false;
      }
    },
    (err: any) => {
      console.log("Something Went Wrong");
    })
  }

  originalOrder() {
    return 0;
  }
  onKey(event: any){
    this.values += event.target.value;
    // console.log(this.values);
    this.searchResource(this.values);
    this.values=''
  }

  searchResource(value: string)
  {
    this.resource.searchResourceService({SerialId:value}).subscribe((res: any) => {
      // console.log(res);
      this.ResourceData = res;
      if(res.length!=0)
      {
        this.show=true;
      }
      else
      {
        this.show=false;
      }
    },
    (err: any) => {
      console.log("Something went wrong")
    })
  }

  addResource(dropDownData: any)
  {
    dropDownData.value.rTypeId = this.rTypeId;
    dropDownData.value.WarrantyValidUpTo = this.pDate;
    this.resource.addService(dropDownData.value).subscribe((res: any) => {
      //console.log(res);
    },
    (err: any) => {
      console.log("Something went wrong")
    });
    this.rTypes = "Type";
    dropDownData.reset();
  }

  calcDate(warranty: any, date: any)
  {
    this.pDate = date;
    var sum = parseInt(this.pDate[3])+parseInt(warranty);
    var year = ''+sum;
    this.pDate = this.pDate.replace(this.pDate[3],year);
  }

}
