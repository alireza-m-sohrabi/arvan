import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { configProvider, ConfigService } from './config-provider.service';
import { CoreModule } from './core/core.module';
import { AppStateModule as AppStateModule } from './state/app-state.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, AppStateModule],
  providers: [ConfigService, configProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
