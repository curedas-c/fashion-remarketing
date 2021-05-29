import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { ErrorPageComponent } from '@shared/components/error-page/error-page.component';
import { NotFoundPageComponent } from '@shared/components/not-found-page/not-found-page.component';

/* import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons'; */

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// ngx loader
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ErrorPageComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    /* NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule, */
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    LoadingBarRouterModule,
    LoadingBarModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
