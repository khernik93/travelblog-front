import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'header-component',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  constructor() { }

}
