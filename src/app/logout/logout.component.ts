import { Component, OnInit } from '@angular/core';
import { FireAvtorisationService } from '../services/fire-avtorisation.service';
import { Router } from '@angular/router'

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public authService: FireAvtorisationService,
              private router : Router) 
  
  { }

  ngOnInit() {
  }

  loggOut()
  {
     this.authService.logOut()
     localStorage.removeItem('token') 
     localStorage.removeItem('one-c-token')    
     this.router.navigate(['/Home'])
  }
  

}
