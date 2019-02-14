import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'footer-component',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  constructor() { }

}
