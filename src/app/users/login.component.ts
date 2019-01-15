import {Component, OnInit} from '@angular/core';
import {User} from './user';
import swal from 'sweetalert2';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  title = 'Iniciar sesión';
  user: User;

  constructor(private authService: AuthService,
              private router: Router) {
    this.user = new User();
  }


  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/clients']);
    }
  }

  login(): void {
    console.log(this.user);
    if (!this.user.username || !this.user.password) {
      swal('Error login', 'Username o password vacíos', 'error');
      return;
    }

    this.authService.login(this.user).pipe(tap(response => console.log(response))).subscribe(user => {
      this.router.navigate(['/clients']);
      swal('Login', `Bienvenido ${user.name} has iniciado sesión con éxito`, 'success');
    }, error => {
      if (error.status === 400) {
        swal('Login', 'Credenciales incorrectas', 'error');
      }
    });
  }

}
