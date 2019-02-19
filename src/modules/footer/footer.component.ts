import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'footer-component',
  styleUrls: ['./footer.component.scss'],
  template: `
    <footer>
      Copyright &copy; 2019
      <div class="to-right">
          <a [routerLink]="routes.admin">( admin )</a>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent { 

  routes: any = {
    admin: '/admin'
  };

}
