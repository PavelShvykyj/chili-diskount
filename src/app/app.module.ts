import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AnketaComponent } from './anketa/anketa.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ManagerComponent } from './manager/manager.component';
import { AdminComponent } from './admin/admin.component';
import { BsNavigationComponent } from './bs-navigation/bs-navigation.component';
import { FireAvtorisationService } from './services/fire-avtorisation.service';
import { FireAuthGuard  } from './services/fire-auth-guard.service';
import { FireDataService  } from './services/fire-data.service';
import { OneCDataService } from './services/one-c-data.service';
import { FormsModule }   from '@angular/forms';
import { SimpleInputComponent } from './simple-input/simple-input.component';
import { HttpClientModule } from '@angular/common/http';
import { Login1CComponent } from './login1C/login1C.component';
import { AlertLableComponent } from './alert-lable/alert-lable.component';
import { GlobalEnumsComponent } from './global-enums/global-enums.component';
import { WorksheetComponent } from './worksheet/worksheet.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnketaComponent,
    LoginComponent,
    LogoutComponent,
    ManagerComponent,
    AdminComponent,
    BsNavigationComponent,
    SimpleInputComponent,
    Login1CComponent,
    AlertLableComponent,
    GlobalEnumsComponent,
    WorksheetComponent
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'Home', component: HomeComponent},
      {path: 'Anketa', component: AnketaComponent},
      {path: 'Login', component: LoginComponent},
      {path: 'LogOut', component: LogoutComponent},
      {path: 'Manager',
       component: ManagerComponent,
       canActivate : [FireAuthGuard]
      },
      {path: 'Admin', 
       component: AdminComponent,
       canActivate : [FireAuthGuard]
       },
      {path: '**', component: HomeComponent},
    ])
  
  ],
  providers: [FireAvtorisationService,
              FireAuthGuard,
              FireDataService,
              OneCDataService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
