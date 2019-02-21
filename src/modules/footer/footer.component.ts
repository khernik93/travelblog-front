import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AdminRoutes, adminRoutes } from '../admin/routing/adminRouting.routes';

@Component({
  selector: 'footer-component',
  styleUrls: ['./footer.component.scss'],
  template: `
    <footer>
      Copyright &copy; 2019
      <div class="to-right">
          <a [routerLink]="adminRoutes.postsList">( admin )</a>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent { 

  adminRoutes: AdminRoutes = adminRoutes;

}
