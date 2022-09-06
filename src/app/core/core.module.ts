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
import { globalErrorHandlerProvider } from './error/global-error-handler';
import { ErrorService } from './error/error.service';
import { ConfirmationDialogService } from './confirmation/confirmation-dialog.service';
import { ConfirmationDialogComponent } from './confirmation/confirmation-dialog.component';
import { TitleService } from './title/title.service';

@NgModule({
  declarations: [LoadingComponent, ConfirmationDialogComponent],
  imports: [SharedModule, HttpClientModule],
  providers: [
    ErrorService,
    AuthGuard,
    UserService,
    AuthService,
    LoadingService,
    CookieService,
    UnauthorizedUtilService,
    authInterceptorProvider,
    globalErrorHandlerProvider,
    ConfirmationDialogService,
    TitleService,
  ],
  exports: [LoadingComponent],
})
export class CoreModule {}
