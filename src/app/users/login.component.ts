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

  loginWithGoogle() {
    this.authService.doGoogleLogin().subscribe(user => {
      console.log(user);
    });
  }
}
