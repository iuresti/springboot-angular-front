import {Component, Input, OnInit} from '@angular/core';
import {Page} from '../share/page';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styles: []
})
export class PaginatorComponent implements OnInit {

  @Input() page: Page<any>;
  pageArray: number[];

  constructor() {
  }

  ngOnInit() {
    this.pageArray = new Array(this.page.totalPages).fill(0).map((value, index) => index + 1);
  }

}
