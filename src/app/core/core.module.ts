import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { LoadingService } from './loading/loading.service';
import { LoadingComponent } from './loading/loading.component';
import { SharedModule } from 'arvan/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { authInterceptorProvider } from './interceptors/auth.interceptor';
import { UserService } from './user/user.service';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedUtilService } from './unauthorized-util.service';

@NgModule({
  declarations: [LoadingComponent],
  imports: [SharedModule, HttpClientModule],
  providers: [
    authInterceptorProvider,
    AuthGuard,
    UserService,
    AuthService,
    LoadingService,
    CookieService,
    UnauthorizedUtilService,
  ],
  exports: [LoadingComponent],
})
export class CoreModule {}
