import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isAuthenticated() || this.authService.isExpired()) {
      this.router.navigate(['/login']);
      return false;
    }

    const role = next.data['role'] as string;
    if (this.authService.hasRole(role)) {
      return true;
    }
    swal('Acceso denegado', 'No tienes acceso a este recurso', 'warning');
    this.router.navigate(['/clients']);
    return false;
  }
}
