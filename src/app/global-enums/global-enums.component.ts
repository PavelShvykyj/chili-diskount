import { Component, OnInit } from '@angular/core';

export enum sendingStatus {
  DoNotSended = 0,
  SendingNow  = 1,
  Successful  = 2,
  Error       = 3
}

@Component({
  selector: 'app-global-enums',
  templateUrl: './global-enums.component.html',
  styleUrls: ['./global-enums.component.css']
})
export class GlobalEnumsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
