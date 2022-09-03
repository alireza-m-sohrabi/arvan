import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './config-provider.service';
import { CoreModule } from './core/core.module';
import { AppStateModule } from './state/app-state.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  appInitializerProvider,
  AppInitializerService,
} from './app-initializer.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AppStateModule,
    ToastrModule.forRoot(),
  ],
  providers: [ConfigService, AppInitializerService, appInitializerProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
