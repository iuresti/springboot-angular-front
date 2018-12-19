import {Injectable} from '@angular/core';
import {Client} from './client';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) {
  }

  public getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>('http://localhost:8080/api/clients');
  }
}
