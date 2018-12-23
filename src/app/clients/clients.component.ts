import {Component, OnInit, ViewChild} from '@angular/core';
import {Client} from './client';
import {ClientsService} from './clients.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public clients: Client[] = [];
  @ViewChild('swalDeleted') swalDeleted: SwalComponent;

  constructor(private clientsService: ClientsService) {
  }

  ngOnInit() {
    this.refreshClients();
  }

  refreshClients() {
    this.clientsService.getClients().subscribe(clients => this.clients = clients);
  }

  deleteClient(client: Client) {
    this.clientsService.delete(client.id).subscribe(() => {
      this.refreshClients();
      this.swalDeleted.show();
    });
  }
}
