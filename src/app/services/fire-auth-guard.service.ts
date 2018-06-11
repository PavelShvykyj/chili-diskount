import { Injectable } from '@angular/core';
import { Router , RouterStateSnapshot, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { FireAvtorisationService } from './fire-avtorisation.service';



@Injectable()
export class FireAuthGuard implements CanActivate {

  constructor(private router : Router,
              private authFireService : FireAvtorisationService ) 
  
  {

  }

  canActivate(rout: ActivatedRouteSnapshot , state : RouterStateSnapshot) 
  {
       let UserDataSnapShot = this.authFireService.getUserDataSnapShot() 
       if (!UserDataSnapShot.isAvtorised)
        {return false}    
       
       if (state.url.endsWith('Admin'))
          {
            return (UserDataSnapShot.isAdmin)  
          }
         
        if (state.url.endsWith('Manager'))
          {
            return (UserDataSnapShot.isManager || UserDataSnapShot.isAdmin) 
          }
        
        return  true   
  }
  
}
