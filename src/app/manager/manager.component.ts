import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Login1CComponent } from '../login1C/login1C.component'; 
import { FireDataService  } from '../services/fire-data.service';
import { OneCDataService } from '../services/one-c-data.service';
import { AlertLableComponent } from '../alert-lable/alert-lable.component';
import * as rx from 'rxjs';

export  interface IDataObject {
  [key: string]: any
}

export class viewObject
{
  ID       : string
  OneC     : string
  FireG    : string
  rowdate  : string
}

@Component({
  selector: 'manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit, OnDestroy {
  
  @ViewChild(Login1CComponent)
  oneComponent: Login1CComponent;

  @ViewChild(AlertLableComponent)
  alertLableComponent: AlertLableComponent;

  fireSubscription :  rx.Subscription 
  viewObjects : Array<viewObject> = []

  constructor(private fireDS : FireDataService,
              private oneDS  : OneCDataService) { }

  ngOnInit()
   {
    this.fireSubscription = this.fireDS.subjectOfWorksheets$.subscribe(resoult =>this.fireListener(resoult))  
  }

  ngOnDestroy()
  {
    this.fireSubscription.unsubscribe()
  }


  UpdateOneCWorksheet(WorksheetData: string)
  {
    var objWorksheetData = JSON.parse(WorksheetData)
    if (objWorksheetData.ID == undefined)
    {
      return 
    }

    if (this.oneComponent.loginIsValid && this.oneComponent.exchangeEnabled)
    {

     var obj : viewObject =  new viewObject()
     obj.ID       = objWorksheetData.ID
     obj.OneC     = "false"
     obj.FireG    = "false"
     obj.rowdate  = new Date().toLocaleString() 
     
     
     this.viewObjects.push(obj) 
     

     this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.SendingNow
     this.alertLableComponent.errorData = "Обновляем анкету 1С"
     
     this.oneDS.PostRequest(this.oneComponent.userName,
                           this.oneComponent.userPwd,
                           this.oneComponent.connectionString+'UpdateWorksheet',
                           WorksheetData)
                .subscribe(
                response =>
                { 
                this.viewObjects[this.viewObjects.length-1].OneC = "ok"
                
                this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.Successful
                this.alertLableComponent.errorData = "Обновили анкету 1С"
                
                this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.SendingNow
                this.alertLableComponent.errorData = "обновляем анкету на fireG"
                this.fireDS.updateStatusOfWorksheet(objWorksheetData.ID, this.oneComponent.filialName)
                           .then(
                           () => 
                           {
                            this.viewObjects[this.viewObjects.length-1].FireG = "ok"
                            this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.Successful
                            this.alertLableComponent.errorData = "Обновили анкету на fireG"
                           
                           },
                           error => 
                           {
                            this.viewObjects[this.viewObjects.length-1].FireG = error.message
                            this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.Error
                            this.alertLableComponent.errorData = "ошибка при обновлении анкеты на fireG "+error.message
                           } 
                          )               
              
                },
                error => 
                {
                this.viewObjects[this.viewObjects.length-1].OneC = error.statusText
                this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.Error
                this.alertLableComponent.errorData = "ошибка при обнодении анкеты 1С "+error.statusText
                })
    }  
  
  }


  fireListener(resoult)
  {
    //console.log(JSON.stringify(resoult))
    this.UpdateOneCWorksheet(JSON.stringify(resoult))
  }  

  onOneCStatusChanged()
  {
    //console.log(this.oneComponent.filialName)
    if (this.oneComponent.exchangeEnabled)
    {
      //this.fireSubscription = this.fireDS.subjectOfWorksheets$.subscribe(resoult =>this.fireListener(resoult))  
      this.fireDS.startListenWorksheetObjects(this.oneComponent.filialName)  
    }
    else
    {      
      this.fireDS.stopListenWorksheetObjects(this.oneComponent.filialName) 
    }

  }

  testClick()
  {
    console.log(new Date(1527844728489).toLocaleString())
    //this.fireDS.startListenWorksheetObjects(this.oneComponent.filialName)
    
  }

}
