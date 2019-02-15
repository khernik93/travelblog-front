import { Component } from '@angular/core';

@Component({
  selector: 'layout-component',
  template: `
    <header-component></header-component>
    <content-component></content-component>
    <footer-component></footer-component>  
  `
})
export class LayoutComponent { }
