// Global
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

// Store
import { adminEffects } from './store/admin.effects';
import { adminReducers } from './store/admin.reducers';

// Components
import { AdminComponent } from './admin.component';
import { WysiwygComponent } from '../../shared/components/wysiwyg/wysiwyg.component';
import { AdminHeaderComponent } from './components/adminHeader/adminHeader.component';
import { AddNewPostContainer } from './containers/addNewPost/addNewPost.container';
import { AdminHeaderContainer } from './containers/adminHeader/adminHeader.container';
import { AdminMenuComponent } from './components/adminMenu/adminMenu.component';
import { PostsTableComponent } from './components/postsTable/postsTable.component';
import { PostFormComponent } from './components/postForm/postForm.component';
import { EditPostContainer } from './containers/editPost/editPost.container';
import { AdminPostsListContainer } from './containers/adminPostsList/adminPostsList.container';

// Modules
import { AdminRoutingModule } from './routing/adminRouting.module';
import { AuthModule } from '../auth/auth.module';

// Services
import { PostsService } from './services/posts.service';
import { AdminPostsListService } from './containers/adminPostsList/adminPostsList.service';

export const MODULE_DECLARATIONS = [
  AdminComponent,
  AddNewPostContainer,
  WysiwygComponent,
  AdminHeaderContainer,
  AdminHeaderComponent,
  AdminMenuComponent,
  AdminPostsListContainer,
  PostsTableComponent,
  PostFormComponent,
  EditPostContainer
];

export const MODULE_IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgxEditorModule,
  HttpClientModule,
  RouterModule
];

const ROUTING_MODULE_IMPORTS = [
  AdminRoutingModule
];

const STORE_IMPORTS = [
  EffectsModule.forFeature(adminEffects),
  StoreModule.forFeature('admin', adminReducers)
];

@NgModule({
  declarations: MODULE_DECLARATIONS,
  imports: [
    ...MODULE_IMPORTS,
    ...ROUTING_MODULE_IMPORTS,
    ...STORE_IMPORTS,
    AuthModule
  ],
  exports: [AdminComponent],
  providers: [
    PostsService,
    AdminPostsListService
  ]
})
export class AdminModule {
  constructor() { }
}
