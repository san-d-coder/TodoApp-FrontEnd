import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { TodoModule } from './todo/todo.module';
import { AuthenticationGuard } from './core/Guards/authentication.guard';


const routes: Routes = [
  {path:'',redirectTo: '/authentication',pathMatch:'full'},
  {path:'authentication',loadChildren: './authentication/authentication.module#AuthenticationModule'},
  {path:'todo',loadChildren: './todo/todo.module#TodoModule',canActivateChild: [AuthenticationGuard]},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
