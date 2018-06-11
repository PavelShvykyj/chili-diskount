import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth }    from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as jwt from 'jsonwebtoken';
import { JwtHelper } from 'angular2-jwt';


export class UserDataObject 
      {userName: string = 'anonim'
      userMail: string  = ''
      userID  : string  = ''
      isAdmin : boolean = false
      isManager : boolean = false
      isAvtorised : boolean = false
      }

@Injectable()
export class FireAvtorisationService {
   
  
  user$ : Observable<UserDataObject>;
  

  constructor(private authObj : AngularFireAuth)
  { 
     this.user$ = this.authObj.authState.map(fireUser => this.getUserData(fireUser))
  }

getUserData(fireUser : firebase.User)
  { 
    var UserData = new UserDataObject()
    
    
    if (fireUser!=null) 
      {
        UserData.userName    = fireUser.email;
        UserData.userMail    = fireUser.email;
        UserData.userID      = fireUser.uid;
        UserData.isAdmin     = false ;
        UserData.isManager   = false;
        UserData.isAvtorised = true;  
      

        // ref - получаем объект ссылка применяем once (реализует подписались получили отписались) это промис забираем данные then получаем объект 
        // firebase.database.DataSnapshot получаем подчиненный узел (он тоже DataSnapshot) получаем значение
        // ошибки обработаются через authState             
        firebase.database().ref("UsersOptions/"+fireUser.uid)
                                     .once("value")
                                     .then(OptionSnapShot => 
                                      {
                                        UserData.isAdmin   = OptionSnapShot.child('isAdmin').val()
                                        UserData.isManager = OptionSnapShot.child('isManager').val()
                                        let token = jwt.sign(JSON.stringify(UserData),'qwerty777');
                                        localStorage.setItem('token',token)
                                     
                                      })
        
        //console.log('Admin? '+UserData.isAdmin)          
        //console.log('Manager? '+UserData.isManager)          
        //console.log(UserData)    
      }  
      
    
    return UserData
  }

logIn(logInData)
  {
    
    return this.authObj.auth.signInWithEmailAndPassword(logInData.Email,logInData.Password)
  }

  logOut()
  {
    localStorage.removeItem('token')
    this.authObj.auth.signOut().catch(error => {console.log(error)})
  }

getUserDataSnapShot()
{
  let jwtHelper = new JwtHelper()
  let token = localStorage.getItem('token')

  if (!token)
    return new UserDataObject()


  return jwtHelper.decodeToken(token)
}                       
  

}
