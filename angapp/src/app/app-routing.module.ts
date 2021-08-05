import { NgModule } from '@angular/core';
import { RouterModule, Routes,RouterLink } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BussearchComponent } from './bussearch/bussearch.component';
import { SeatselectionComponent } from './seatselection/seatselection.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  {
   path:'', 
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path:'register', component: RegisterComponent
  },
  
  {
    path: 'bussearch', component: BussearchComponent
  }, 
  {
    path: 'seatselection', component: SeatselectionComponent
  },
  {
    path: 'payment' , component: PaymentComponent
  },
  {
    path: 'confirmation', component:ConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
