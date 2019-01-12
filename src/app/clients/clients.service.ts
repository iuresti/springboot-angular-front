import {Injectable} from '@angular/core';
import {Client} from './client';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Page} from '../share/page';
import {Region} from './region';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private httpHeaders = new HttpHeaders();
  private clientBaseURL = `${environment.baseApiURL}/client`;
  private cachedRegions: Region[];

  constructor(private httpClient: HttpClient) {
    this.httpHeaders.set('content-type', ['application/json']);
  }

  public getClients(page: number): Observable<Page<Client>> {
    return this.httpClient.get<Page<Client>>(`${this.clientBaseURL}/page/${page}`);
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

  public uploadPicture(file: File, id: number): Observable<Client> {
    const formData = new FormData();

    formData.append('file', file);

    return this.httpClient.put<Client>(`${this.clientBaseURL}/${id}/image`, formData);
  }

  public getRegions(): Observable<Region[]> {
    if (this.cachedRegions) {
      return of(this.cachedRegions);
    }

    return this.httpClient.get<Region[]>(`${environment.baseApiURL}/region`).pipe(tap(regions => this.cachedRegions = regions));
  }
}
