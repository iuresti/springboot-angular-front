import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public autor: { name: string; lastName: string; } = {
    name: 'Iván',
    lastName: 'Uresti'
  };

  constructor() { }

  ngOnInit() {
  }

}
