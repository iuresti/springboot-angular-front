import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {DirectiveComponent} from './directive/directive.component';
import {ClientsComponent} from './clients/clients.component';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormComponent} from './clients/form.component';
import {FormsModule} from '@angular/forms';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {registerLocaleData} from '@angular/common';
import localeES from '@angular/common/locales/es-MX';
import {PaginatorComponent} from './paginator/paginator.component';
import {DetailComponent} from './clients/detail.component';
import {LoginComponent} from './users/login.component';
import {AuthGuard} from './users/guards/auth.guard';
import {RoleGuard} from './users/guards/role.guard';
import {TokenInterceptor} from './users/interceptors/token.interceptor';
import {AuthInterceptor} from './users/interceptors/auth.interceptor';

const ROUTES: Routes = [
  {path: '', redirectTo: '/clients', pathMatch: 'full'},
  {path: 'directives', component: DirectiveComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'clients/page/:page', component: ClientsComponent},
  {path: 'clients/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'clients/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'clients/detail/:id', component: DetailComponent},
  {path: 'login', component: LoginComponent}
];

registerLocaleData(localeES, 'es-MX');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectiveComponent,
    ClientsComponent,
    FormComponent,
    PaginatorComponent,
    DetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    SweetAlert2Module.forRoot()
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-MX'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
