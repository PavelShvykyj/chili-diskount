import { Component, OnInit, ViewChild } from '@angular/core';
import { Login1CComponent } from '../login1C/login1C.component'; 
import { AlertLableComponent } from '../alert-lable/alert-lable.component';
import { OneCDataService } from '../services/one-c-data.service';
import { FireDataService } from '../services/fire-data.service';
import { error } from 'util';




@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild(Login1CComponent)
  private oneComponent: Login1CComponent;

  @ViewChild(AlertLableComponent)
  private alertLableComponent: AlertLableComponent;

  packageDates : Array<string>
  packageDate  : string

  constructor(private fireDS : FireDataService,
              private oneDS : OneCDataService ) { }

  ngOnInit() { }

  GetWorkSheetOject() {
    this.fireDS.getWorksheetStructure().then(struct => {
      //console.log(struct)
      struct.forEach(element => {
        //console.log(element)
        switch (element.Type) {
          case "Group":
            console.log("Group");
            break;
          case "Select":
            console.log("Select");
            break;
          default:
            console.log("Input");
            break;
        }
      });
    })
  }


  getPackageDates()
  {
    
    if (this.oneComponent.loginIsValid && this.oneComponent.exchangeEnabled)
    {
      this.packageDates = []
      this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.SendingNow
      this.alertLableComponent.errorData = "получаем доступные даты"
      
      this.oneDS.GetRequest(this.oneComponent.userName,
                                 this.oneComponent.userPwd,
                                 this.oneComponent.connectionString+"getPackageDates")
      .subscribe(
        response =>
        { 
        this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.Successful
        this.alertLableComponent.errorData = "получаем доступные даты"
        this.packageDates = response["rootnode"]  
        },
       error => 
       {
        this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.Error
        this.alertLableComponent.errorData = error
       }
      )
    }
  }

  SetPackageDate(packageDate)
  {
    //window.document.getElementById("packageDate").value = packageDate
    this.packageDate = packageDate
  }

  testUpdatePackage(el)
  {
    console.log(el)
  }

  UpdatePackage()
  {
    if (this.oneComponent.loginIsValid && this.oneComponent.exchangeEnabled && this.packageDate.length != 0 )
    {
     this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.SendingNow
     this.alertLableComponent.errorData = "получаем пакет карт по дате"
     
     this.oneDS.GetRequest(this.oneComponent.userName,
                           this.oneComponent.userPwd,
                           this.oneComponent.connectionString+"getPackage"+this.packageDate)
                .subscribe(
                response =>
                { 
                this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.Successful
                this.alertLableComponent.errorData = "получили пакет"
                let cartPackage : Array<string> = response["rootnode"]  
                this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.SendingNow
                this.alertLableComponent.errorData = "Отправляем пакет на fireG"

                this.fireDS.createPackageOfWorksheets(cartPackage)
                           .then(
                           () => 
                           {
                            this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.Successful
                            this.alertLableComponent.errorData = "Отправили пакет на fireG"
            
                           },
                           error => 
                           {
                            this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.Error
                            this.alertLableComponent.errorData = "ошибка при отправке пакета "+error.message
                           }
                )
                },
                error => 
                {
                this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.Error
                this.alertLableComponent.errorData = "ошибка при получении пакета "+error
                })
    }  
  }
}
