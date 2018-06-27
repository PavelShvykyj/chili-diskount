import { Component, OnInit , OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FireAvtorisationService } from '../services/fire-avtorisation.service';
import { FireDataService } from '../services/fire-data.service';
import { Subscription } from 'rxjs/Subscription';
import { FirebaseOperation, FirebaseObjectObservable } from 'angularfire2/database';
import { AlertLableComponent } from '../alert-lable/alert-lable.component';

@Component({
  selector: 'anketa',
  templateUrl: './anketa.component.html',
  styleUrls: ['./anketa.component.css']
})
export class AnketaComponent implements OnInit, OnDestroy{
  
  
  secretCodeExists : boolean = false
  secretCodeSended : boolean = false
  dataSource : FireDataService
  CodeExistsSubscripton : Subscription
  $anketa : FirebaseObjectObservable<any>
  
  @ViewChild(AlertLableComponent)
  private alertLableComponent: AlertLableComponent;


  constructor(authService : FireAvtorisationService,
              dataService : FireDataService
              ) {
                this.dataSource = dataService
              
              }
  
  ClearAlertLable()
  {
    this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.DoNotSended
    this.alertLableComponent.errorData = ""
  }            


  ngOnInit() {
    this.ClearAlertLable()

  }

  ngOnDestroy()
  {  if (this.CodeExistsSubscripton !=null && !this.CodeExistsSubscripton.closed)
        { 
          this.CodeExistsSubscripton.unsubscribe()
        }
  }


  checkCode(code)
  {
    
    this.$anketa = this.dataSource.getAnketa("ID"+code.value)  
    this.CodeExistsSubscripton = this.$anketa.subscribe(node=>{
                                                  this.secretCodeSended = true;
                                                  this.secretCodeExists = node.$exists()
                                                })  
  }

  secretcodeOnkeyup()
  {
      this.secretCodeSended = false;
      this.secretCodeExists = false;
      this.ClearAlertLable()
  }

  anketeDataOnkeyup()
  {
    this.ClearAlertLable()
  }
  
  Submit(formObj)
  { 
    this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.SendingNow
    this.alertLableComponent.errorData = "Отсылаю данные"

    this.$anketa.update({
                Email : formObj.value.AnketEmail,                       
                Name  : formObj.value.LastName+" "+formObj.value.FirstName+" "+formObj.value.MiddleName,
                Phone : formObj.value.Phone,
                "1"   : "10",   
                "2"   : "10",
                "3"   : "10",
                delStatus : "000"
                })
                 .then(()=>{
                            this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.Successful
                            this.alertLableComponent.errorData = "Анкета успешно зарегистрирована"
              
                            this.secretCodeExists = false;
                            this.secretCodeSended = false;

                          },
                      error => {
                                this.alertLableComponent.alertStatus = this.alertLableComponent.alertData.Error
                                this.alertLableComponent.errorData = error.message
                              })
  }

  GetWorkSheetOject() {
    this.dataSource.getWorksheetStructure().then(struct => {
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


}
