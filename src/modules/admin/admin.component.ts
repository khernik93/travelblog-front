/* istanbul ignore file */
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'admin-component',
  template: `
    <adminHeader-container></adminHeader-container>
    <div class="d-flex">
      <adminMenu-component></adminMenu-component>
      <div class="content p-4">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent { }
