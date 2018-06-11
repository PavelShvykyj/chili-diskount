import { Component,  Input } from '@angular/core';

export enum sendingStatus {
  DoNotSended = 0,
  SendingNow  = 1,
  Successful  = 2,
  Error       = 3
}


@Component({
  selector: 'alert-lable',
  templateUrl: './alert-lable.component.html',
  styleUrls: ['./alert-lable.component.css']
})
export class AlertLableComponent  {

  alertData = sendingStatus 
  @Input() alertStatus = this.alertData.DoNotSended
  @Input() errorData : string = 'not sended'
    
  HideAlert()
  {
    this.alertStatus = this.alertData.DoNotSended
  }

  constructor() { }

 
}
