import {Component, OnInit} from '@angular/core';
import {ClientsService} from './clients.service';
import {Client} from './client';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit {

  public client: Client;
  private selectedPicture: File;
  imageSource: string;

  constructor(private clientService: ClientsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.clientService.getClient(+params['id']).subscribe(client => {
          this.client = client;
          this.imageSource = `${environment.baseApiURL}/client/image/${client.pathImage}`;
        });
      }
    });
  }

  selectPicture(event) {
    this.selectedPicture = event.target.files[0];
  }

  uploadPicture() {
    this.clientService.uploadPicture(this.selectedPicture, this.client.id).subscribe(client => {
      this.client = client;
    });
  }
}
