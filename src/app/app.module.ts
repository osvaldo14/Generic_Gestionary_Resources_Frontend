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
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatStepperModule,
  MatInputModule, MatFormFieldModule, MatDialogModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material';
import {MatTreeModule} from '@angular/material/tree';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import { LoginComponent } from './login/login.component';
import {fakeBackendProvider} from './fake-backend-interceptor';
import {ErrorInterceptor} from './error-interceptor';
import {JwtInterceptor} from './jwt-interceptor';
import {routing} from './routing';
import { ChoiceCreationComponent } from './choice-creation/choice-creation.component';
import { CreateTypeComponent } from './create-type/create-type.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    CalendarComponent,
    NavigationComponent,
    SideNavBarComponent,
    CreateResourceComponent,
    LoginComponent,
    ChoiceCreationComponent,
    CreateTypeComponent,
  ],
  entryComponents: [
    CreateResourceComponent,
    ChoiceCreationComponent,
    CreateTypeComponent,
    LoginComponent],
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
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    routing
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);

