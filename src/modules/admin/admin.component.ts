import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'admin-component',
  template: `
    <div class="admin-container">
      <adminHeader-container></adminHeader-container>
      <section>
        <div class="section-inner">
          <addNewPost-container></addNewPost-container>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent { }
