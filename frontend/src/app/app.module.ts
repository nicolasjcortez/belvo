import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateLinkComponent } from './create-link/create-link.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from "ngx-loading";
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CreateLinkComponent,
    BoardUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({}),
    MatCardModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
