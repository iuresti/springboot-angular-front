import {Component, ViewChild} from '@angular/core';
import {Client} from './client';
import {ClientsService} from './clients.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent {

  public client: Client = new Client();
  public title = 'Agregar cliente';
  @ViewChild('swalSaved') swalSaved: SwalComponent;
  @ViewChild('swalError') swalError: SwalComponent;
  public clientId: number;

  constructor(private clientService: ClientsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.loadClient(params['id']);
      }
    });
  }

  loadClient(id: number) {
    this.clientId = id;
    this.clientService.getClient(id).subscribe(client => {
      this.title = 'Modificar cliente';
      this.client = client;
    }, error => {
      this.swalError.text = error.error.message;
      this.swalError.show();
      this.router.navigate(['/clients']);
    });
  }

  create() {
    this.clientService.save(this.client).subscribe(() => {
      this.router.navigate(['/clients']);
      this.swalSaved.show();
    });
  }

  goBack() {
    this.router.navigate(['/clients']);
  }
}
