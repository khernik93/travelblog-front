import { Component } from '@angular/core';

@Component({
  selector: 'adminMenu-component',
  templateUrl: 'adminMenu.component.html',
  styleUrls: ['../../admin.component.scss']
})
export class AdminMenuComponent { 

  routes: any = {
    managePosts: '/admin/managePosts',
    addNewPost: '/admin/addNewPost'
  };

}
