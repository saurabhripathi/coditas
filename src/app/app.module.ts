import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GitCardComponent } from './git-card/git-card.component';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainApplicationComponent } from './main-application/main-application.component';
import { LoaderComponent } from './shared/component/loader/loader.component'
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { InterceptorService } from './shared/service/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GitCardComponent,
    MainApplicationComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProgressSpinnerModule
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
