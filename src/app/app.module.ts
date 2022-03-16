import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { EnvService } from './shared/env.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ExtAngularModernModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    EnvService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
