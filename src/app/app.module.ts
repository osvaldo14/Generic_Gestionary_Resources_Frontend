import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeroesComponent } from './heroes/heroes.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NavigationComponent } from './navigation/navigation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool
import { FlatpickrModule } from 'angularx-flatpickr';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material';
import {MatTreeModule} from '@angular/material/tree';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    CalendarComponent,
    NavigationComponent,
    SideNavBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule,
    FlatpickrModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
