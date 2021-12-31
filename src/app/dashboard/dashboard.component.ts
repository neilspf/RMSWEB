import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { RequestService } from '../service/request.service';
import * as Highcharts from "highcharts";
import { ResourceService } from '../service/resource.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public RequestData!: any[];
  public adminName: string = "Admins";
  public adminId: number = 0;
  public AdminList: any = []
  objectKeys = Object.keys;
  public show: boolean = false;
  public isAdmin: boolean = false;


  constructor(private request: RequestService, private user: LoginService,private resource :ResourceService) { 
    this.getCountOverResource()
    this.getCountResourceByType()
    this.checkAdmin();
    this.getAdmin();
  }
  getCountResourceByType() {
    this.resource.countResourceServiceByType().subscribe((res: any) => {
      console.log(res);
      let result=[];
      for (const x of res) {
        let temp = [x.rTypeName ,x.resourceCount];
        result.push(temp);
      }
      this.options1.series[0].data=result;
      Highcharts.chart("container1",this.options1);

    })

  }
  public options1: any = {
    chart: {
      type: 'column'
  },
  title: {
      text: 'Resource Count'
  },
  xAxis: {
      type: 'category',
      labels: {
          rotation: -45,
          style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
          }
      }
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Population (millions)'
      }
  },
  legend: {
      enabled: false
  },
  tooltip: {
      pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
  },
  series: [{
      name: 'Population',
      data:this.getCountResourceByType() ,
      dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
          }
      }
  }]
}
getCountOverResource() {
    this.resource.countResourceService().subscribe((res: any) => {
      let assigned = (res[0].assigned/res[0].total)*100;
      let notassigned = 100-assigned;
      let result =[
        {name:"Assigned",y:assigned},
        {name:"Not Assigned",y:notassigned},

    ]
    this.options.series[0].data=result;
    Highcharts.chart('container', this.options);
    })


  }
  public options: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Resource Allocation'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              connectorColor: 'silver'
          }
      }
  },
  series: [{
    data:this.getCountOverResource()
  }
  ]
};

  ngOnInit(): void {
   
  }

  getAdmin()
  {
    this.user.adminListService().subscribe((res: any) => {
      this.AdminList = [{empId: 0, empName: "All"}];
      this.AdminList = this.AdminList.concat(res);
      console.log(res);
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
        // this.getType();
        this.adminRequest({EmpId : 0});
      }
      else
      {
        this.userRequest();
      }
    },
    (err: any) => {
      console.log("Something Went Wrong");
    })
  }

  updateData(dropDownData: any)
  {
    this.adminName = dropDownData.empName;
    this.adminId = dropDownData.empId;
    this.adminRequest({Empid: this.adminId});
  }

  adminRequest(data: any)
  {
    this.request.adminRequestService(data).subscribe((res: any) => {
      if(res!=0)
      {
        this.show=true;
      }
      else
      {
        this.show=false;
      }
      for (const req of res) 
      {
        if(req.status==false)
        {
          req.status="Request Pending";
        }
        else
        {
          req.status="Request Completed"
        }
      }
      this.RequestData = res;
      //console.log(res);
    },
    (err: any) => {
      console.log("Something went wrong");
    })
  }

  userRequest()
  {
    this.request.userRequestService({EmpEmail : localStorage.getItem('currentUser')}).subscribe((res: any) => {
      if(res!=0)
      {
        this.show=true;
      }
      else
      {
        this.show=false;
      }
      for (const req of res) 
      {
        if(req.status==false)
        {
          req.status="Request Pending";
        }
        else
        {
          req.status="Request Completed"
        }
      }
      this.RequestData = res;
      //console.log(res);
    },
    (err: any) => {
      console.log("Something went wrong");
    })
  }

  originalOrder() {
    return 0;
  }

}

