import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { OneCDataService } from '../services/one-c-data.service';
import { FireDataService  } from '../services/fire-data.service';
import { AlertLableComponent } from '../alert-lable/alert-lable.component';
import * as jwt from 'jsonwebtoken';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'login1c',
  templateUrl: './login1C.component.html',
  styleUrls: ['./login1C.component.css']
})
export class Login1CComponent implements OnInit {

  userName : string = '';
  filialName : string = '';
  userPwd : string = '';
  connectionString : string = 'http://localhost/base/hs/Worksheets/';
  loginIsValid : boolean = false;
  exchangeEnabled : boolean = false;
  showConnectionString : boolean = false;

  @Output() change = new EventEmitter()

  @ViewChild(AlertLableComponent)
  private alertLableComponent: AlertLableComponent;

  constructor(private oneDS : OneCDataService, 
              private fireDS : FireDataService) {}
  
  StateExchangeStatus(status: boolean)
  {
    //console.log("1C on change")
    this.exchangeEnabled=status
    this.change.emit()
  }
 
  ngOnInit() {
   let token = localStorage.getItem("one-c-token")
   let helper = new JwtHelper() 
   if (token)
    { let userData = helper.decodeToken(token)
      this.userName = userData.userName
      this.userPwd = userData.userPwd
      this.filialName = userData.filialName
      this.loginIsValid = true
    }
  }

  // Изменение данных формы приводит к необходимости перепроверить пароль
  UserDataOnChange()
  {
    localStorage.removeItem("one-c-token")
    this.loginIsValid = false;
    this.exchangeEnabled = false;
  }

  Submit(formObj)
  { 
    
    localStorage.removeItem("one-c-token")
    this.loginIsValid = false
    
    this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.SendingNow
    this.alertLableComponent.errorData = "запрашиваем пароль 1С"
    
    this.oneDS.checkLogginData(this.userName,this.userPwd,this.connectionString+"authrequest")
     .subscribe(response =>{
       //console.log(response)
       if (response=='Да')
        {this.loginIsValid = true
         let UserData = {userName : this.userName,
                         userPwd : this.userPwd,
                         filialName : this.filialName }           
          let secretKey = this.fireDS.getSecretKodeForToken();
          let token = jwt.sign(JSON.stringify(UserData),secretKey); 
          localStorage.setItem("one-c-token",token)  
          this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.DoNotSended
          this.alertLableComponent.errorData = "ОК"
        }  
      else
        {
          this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.Error
          this.alertLableComponent.errorData = "Не прошла внутренняя аторизация 1С"
        }  

      },
      error => {this.loginIsValid = false 
        this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.Error
        this.alertLableComponent.errorData = "Не верный пароль 1С "+JSON.stringify(error)
        
      }
      )

     


  }

  



}
