import {Component, OnInit} from '@angular/core';
import {AuthService} from '../users/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {


  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

}
