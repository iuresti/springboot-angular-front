import {Component} from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styles: []
})
export class DirectiveComponent {

  curseList: string[] = ['Typescript', 'Javascript', 'Java SE', 'C#', 'PHP'];
  enableList = true;

  constructor() {
  }
}
