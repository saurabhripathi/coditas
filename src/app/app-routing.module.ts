import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainApplicationComponent } from './main-application/main-application.component';


const routes: Routes = [{
  path: 'search', component:MainApplicationComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
