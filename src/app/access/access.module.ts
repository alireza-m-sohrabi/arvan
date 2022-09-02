import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccessRoutingModule } from './access-routing.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [AccessRoutingModule],
})
export class AccessModule {}
