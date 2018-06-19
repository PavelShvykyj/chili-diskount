import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validator , FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.css']
})
export class WorksheetComponent implements OnInit {

  formWorkSheet : FormGroup  
  constructor(fb : FormBuilder) {
    this.formWorkSheet = fb.group([])

   }

  ngOnInit() {
  }

}
