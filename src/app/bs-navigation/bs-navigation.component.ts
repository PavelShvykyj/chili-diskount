import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FireAvtorisationService } from '../services/fire-avtorisation.service';


@Component({
  selector: 'bs-navigation',
  templateUrl: './bs-navigation.component.html',
  styleUrls: ['./bs-navigation.component.css']
})
export class BsNavigationComponent implements OnInit,OnDestroy  {
  

  constructor(public authService: FireAvtorisationService)
  { 
    
  }

  ngOnInit() 
  {
  }

  @HostListener('window:beforeunload')
  logOut(){
    this.authService.logOut()
    localStorage.removeItem('token') 
    localStorage.removeItem('one-c-token')  
    return "log out"
  }


  ngOnDestroy()
  {
    this.logOut()
  }

}
