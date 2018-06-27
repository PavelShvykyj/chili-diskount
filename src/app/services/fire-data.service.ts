import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as rx from 'rxjs';
import { error, promise } from 'protractor';
import { reject } from 'q';

export  interface IDataObject {
  [key: string]: any
}

export class FilialsNodeStructure
{
  "1": "00"
  "2": "00"
  "3": "00" 
  "delStatus" : "000"                    
}

@Injectable()
export class FireDataService {

  dataSourse : AngularFireDatabase
  subjectOfWorksheets$ : Subject<IDataObject>
  
  constructor(db : AngularFireDatabase) {
    this.dataSourse = db
    this.subjectOfWorksheets$ = new rx.Subject<IDataObject>()
  }

  getSecretKodeForToken()
  {
    return 'qwerty777'
  }

  getWorksheetStructure() : Promise<IDataObject>
  {
    
    return firebase.database().ref("WorkSheetPoints")
            .once("value")
            .then(
                  snapshotStructure => {
                    let struct = snapshotStructure.val() as IDataObject
                    return struct
                  }
                )  as Promise<IDataObject>
  }


  getWorksheetObject(DataSnapshot : firebase.database.DataSnapshot )
  {
    var dataObj : IDataObject = {}
    DataSnapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      // console.log(key)
      dataObj["Email"] = DataSnapshot.child(key).child("Email").val() 
      dataObj["Phone"] = DataSnapshot.child(key).child("Phone").val() 
      dataObj["Name"] = DataSnapshot.child(key).child("Name").val() 
      dataObj["ID"] = key
      return true; /// функция являеться слушателем , подключается к ref.on() и по требованиям должна вернуть булево 
    })

    this.subjectOfWorksheets$.next(dataObj)
  }

  startListenWorksheetObjects(filial:string)
  {
     firebase.database().ref().child('Data/').orderByChild(filial).equalTo("10").limitToFirst(1).on('value',this.getWorksheetObject,this)
  }

  stopListenWorksheetObjects(filial:string)
  {
    firebase.database().ref().child('Data/').orderByChild(filial).equalTo("10").limitToFirst(1).off()
  }
 
   getAnketa(code)
    {
      return this.dataSourse.object('/Data/'+code)
    }

   createPackageOfWorksheets(packageArray : Array<string>)
   {
      var upData: IDataObject = {}
      var ref = firebase.database().ref("Data");
      packageArray.forEach(cartNumber => {
        let propName = "ID"+cartNumber 
        
        upData[propName] = {
          "1": "00",
          "2": "00",
          "3": "00", 
          "delStatus" : "000"                    
        }    
        
      });
      return ref.update(upData)
   }   

  updateStatusOfWorksheet(ID_Kart: string, ID_Filial: string )
  {
    var ref = firebase.database().ref("Data/"+ID_Kart);
    var resoult = firebase.database().ref("Data/"+ID_Kart+"/delStatus")
                       .once("value")
                       .then(
      delStatus  => {
        var sdelStatus : string = delStatus.val()
        var upData: IDataObject = {}
        var nID_Filial  = parseInt(ID_Filial)-1
        var bitStatusFilial = "1"
        var delStatusNew = sdelStatus.substr(0, nID_Filial) + bitStatusFilial+ sdelStatus.substr(nID_Filial + bitStatusFilial.length);
        upData[ID_Filial] = "11"            // "11" интерпритируем как  "анкета заполнена = да / филиалом 1С получена = да"
        upData["delStatus"] = delStatusNew  // тут по номеру IDFilial вписать единицу
        return ref.update(upData)
      },
      error => {
        var upData: IDataObject = {}
        upData[ID_Filial] = "10"            
        return ref.update(upData)  
      } 
    ) 
    return resoult
 }

}
