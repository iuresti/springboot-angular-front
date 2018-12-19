import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public clients: Client[] = [];

  constructor(private clientsService: ClientsService) { }

  ngOnInit() {
    this.clientsService.getClients().subscribe(clients => this.clients = clients);
  }

}
