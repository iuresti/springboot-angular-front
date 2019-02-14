import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ACCESS_TOKEN = 'ACCESS_TOKEN';
  private accessToken: string;
  private _user: User;

  constructor(public afAuth: AngularFireAuth, private httpClient: HttpClient) {
    this.accessToken = sessionStorage.getItem(this.ACCESS_TOKEN);
    this._user = this.buildUser(this.accessToken);
  }

  doGoogleLogin(): Observable<any> {
    return new Observable<any>(subscriber => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          subscriber.next({response: res, currentUser: res.user});
          subscriber.complete();
        });
    });
  }

  public get user(): User {
    return this._user;
  }

  public get token(): string {
    return this.accessToken;
  }

  login(user: User): Observable<User> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';
    const credentials = btoa('angular-app:12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`
    });
    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);

    return this.httpClient.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders})
      .pipe(
        tap(response => {
          console.log(response);
          this.accessToken = response.access_token;
          sessionStorage.setItem(this.ACCESS_TOKEN, this.accessToken);
        }),
        map(() => {
          this._user = this.buildUser(this.accessToken);

          return this._user;
        }));
  }

  private buildUser(accessToken: string): User {
    if (accessToken) {
      accessToken = accessToken.split('.')[1];
      const userInfo: any = JSON.parse(atob(accessToken));
      this._user = new User();

      this._user.username = userInfo.user_name;
      this._user.name = userInfo.name;
      this._user.roles = userInfo.authorities;
      this._user.email = userInfo.email;

      return this._user;
    }
    return null;
  }

  public isAuthenticated(): boolean {
    return this._user != null;
  }

  public logout() {
    sessionStorage.clear();
    this.accessToken = null;
    this._user = null;
  }

  public hasRole(roleName: string): boolean {
    if (!roleName.startsWith('ROLE_')) {
      roleName = 'ROLE_' + roleName;
    }

    return this._user && this._user.roles && this._user.roles.includes(roleName);
  }

  public isExpired(): boolean {
    if (this.accessToken) {
      const now = new Date().getTime() / 1000;
      const tokenInfo: any = JSON.parse(atob(this.accessToken.split('.')[1]));

      return tokenInfo.exp < now;
    }

    return false;
  }
}
