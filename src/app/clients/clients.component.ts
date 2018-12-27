import {Component, OnInit, ViewChild} from '@angular/core';
import {Client} from './client';
import {ClientsService} from './clients.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {Page} from '../share/page';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public page: Page<Client> = new Page<Client>();
  public clients: Client[] = [];
  @ViewChild('swalDeleted') swalDeleted: SwalComponent;

  constructor(private clientsService: ClientsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.refreshClients(params['page'] ? (+params['page']) - 1 : 0);
    });

  }

  refreshClients(pageToGo: number) {
    this.clientsService.getClients(pageToGo).subscribe(page => this.page = page);
  }

  deleteClient(client: Client) {
    this.clientsService.delete(client.id).subscribe(() => {
      this.refreshClients(0);
      this.swalDeleted.show();
    });
  }
}
