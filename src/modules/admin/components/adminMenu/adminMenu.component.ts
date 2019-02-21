import { Component } from '@angular/core';
import { AdminRoutes, adminRoutes } from '../../routing/adminRouting.routes';

@Component({
  selector: 'adminMenu-component',
  templateUrl: 'adminMenu.component.html',
  styleUrls: ['../../admin.component.scss']
})
export class AdminMenuComponent { 

  adminRoutes: AdminRoutes = adminRoutes;

}
