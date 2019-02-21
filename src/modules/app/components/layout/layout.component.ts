import { Component } from '@angular/core';

@Component({
  selector: 'layout-component',
  template: `
    <header-component></header-component>
    <content-component></content-component>
  `
})
export class LayoutComponent { }
