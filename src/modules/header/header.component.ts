import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'header-component',
  styleUrls: ['./header.component.scss'],
  template: `
    <header>
      <logo-component></logo-component>
      <menu-container></menu-container>
      <swiper-container></swiper-container>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent { }
