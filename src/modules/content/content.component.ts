import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'content-component',
  styleUrls: ['./content.component.scss'],
  template: `
    <section>
      <div class="left-section">
        <router-outlet></router-outlet>
      </div>
      <div class="right-section">
        <div class="right-section-inner">
          <selfie-component></selfie-component>
          <recentPosts-container></recentPosts-container>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent { }
