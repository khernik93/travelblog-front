import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'header-component',
  styleUrls: ['./header.component.scss'],
  template: `
    <header>
      <swiper-container></swiper-container>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent { }
