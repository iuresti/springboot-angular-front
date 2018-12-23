import {Injectable} from '@angular/core';
import {Client} from './client';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private httpHeaders = new HttpHeaders();
  private clientBaseURL = `${environment.baseApiURL}/client`;

  constructor(private httpClient: HttpClient) {
    this.httpHeaders.set('content-type', ['application/json']);
  }

  public getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.clientBaseURL);
  }

  public save(client: Client): Observable<Client> {
    if (client.id) {
      return this.httpClient.put<Client>(this.clientBaseURL, client);
    } else {
      return this.httpClient.post<Client>(this.clientBaseURL, client, {
        headers: this.httpHeaders
      });
    }
  }

  public getClient(id: number): Observable<Client> {
    return this.httpClient.get<Client>(`${this.clientBaseURL}/${id}`);
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.clientBaseURL}/${id}`);
  }
}
