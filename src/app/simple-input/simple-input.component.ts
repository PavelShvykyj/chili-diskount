import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'simple-input',
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.css']
})
export class SimpleInputComponent implements OnInit {
  @Input('wievName') wievName : string
  @Input('wievPlaceholder') wievPlaceholder : string
  @Input('wievDescription') wievDescription : string
  
  constructor() { }

  ngOnInit() {
  }

}
