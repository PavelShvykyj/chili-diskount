import { Component, OnInit } from '@angular/core';
import { FireAvtorisationService } from '../services/fire-avtorisation.service';
import { Router } from '@angular/router'
import { Form } from '@angular/forms'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  resoult = {error: '',
             status : true}


  constructor(public authService: FireAvtorisationService,
              private router : Router) 
  
  { }

  ngOnInit() {
  }

  loggIn(logginFormData)
  { 
    
    let loggData = {
      Email :logginFormData.value.inputEmail,
      Password : logginFormData.value.inputPassword 
    }
    
     this.authService.logIn(loggData).then(
                                          ()=>{this.router.navigate(['/Home'])},
                                          error => {//console.log(error.message);
                                                    this.resoult.status = false
                                                    this.resoult.error = error.message}                
                                          )    
  }

}
