import { Component, OnInit } from '@angular/core';
import { FireDataService } from '../services/fire-data.service';
import { FormControl, FormGroup, ValidatorFn, Validator , FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.css']
})
export class WorksheetComponent implements OnInit {
  formWorkSheet : FormGroup
  formWorkSheetStruct    
  
  constructor(private fb : FormBuilder, private FireDS : FireDataService) {}

  ngOnInit(){
    this.formWorkSheet = this.fb.group({})  
    this.FireDS.getWorksheetStructure().then(struct => {
      this.formWorkSheetStruct = struct    
      for  (let elementName in struct )
        {
          console.log(elementName)

          let element = struct[elementName]
          console.log(element)
          switch (element.Type) {
            case "Group":            
              this.formWorkSheet.addControl(element.Name,this.fb.group({}))
              for  (let groupElementName in element )
                {              
                
                (this.formWorkSheet.controls[element.Name] as FormGroup)
                .addControl(element[groupElementName].Name,
                            this.fb.control('')) 
                }  
              
              
              
              break;
            case "Select":
              this.formWorkSheet.addControl(element.Name,this.fb.control(''))
              break;
            default:
              this.formWorkSheet.addControl(element.Name,this.fb.control(''))
              break;
          }
        }
      });

    }
  
    test(){
      for  (let element in this.formWorkSheet.controls )
        console.log(element)
          }
  
  }
  
  


