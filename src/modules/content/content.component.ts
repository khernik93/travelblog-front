import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'content-component',
  styleUrls: ['./content.component.scss'],
  templateUrl: './content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {

  constructor() { }

}
