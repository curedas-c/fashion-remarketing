import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { ErrorPageComponent } from '@shared/components/error-page/error-page.component';
import { NotFoundPageComponent } from '@shared/components/not-found-page/not-found-page.component';

/* import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons'; */

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SharedModule } from '@shared/modules/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ErrorPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    /* NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule, */
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
