import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../auth.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private  authService: AuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error => {

      if (error.status === 401) {
        if (this.authService.isAuthenticated()) {
          this.authService.logout();
        }
        this.router.navigate(['/login']);
      }

      if (error.status === 403) {
        swal('Accesso denegado', 'No tienes accesso a este recurso', 'warning');
        this.router.navigate(['/login']);
      }

      return throwError(error);
    }));
  }
}
