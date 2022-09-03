import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccessRoutingModule } from './access-routing.module';
import { AccessComponent } from './access.component';
import { SharedModule } from 'arvan/shared/shared.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AccessComponent],
  imports: [AccessRoutingModule, SharedModule],
})
export class AccessModule {}
