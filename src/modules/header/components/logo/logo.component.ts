import { Component } from '@angular/core';

@Component({
  selector: 'logo-component',
  styleUrls: ['./logo.component.scss'],
  template: `
    <section>
      <h1><a [routerLink]="'/'">Backpacking</a></h1>
      <h4><p>Travel blog</p></h4>
    </section>`
})
export class LogoComponent { }
