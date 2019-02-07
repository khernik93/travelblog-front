// Global
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

// Store
import { adminEffects } from './store/admin.effects';

// Components
import { AdminComponent } from './admin.component';
import { AddNewPostComponent } from './components/addNewPost/addNewPost.component';
import { WysiwygComponent } from '../../shared/components/wysiwyg/wysiwyg.component';
import { AdminHeaderComponent } from './components/adminHeader/adminHeader.component';

// Modules
import { AdminRoutingModule } from './routing/adminRouting.module';
import { AuthModule } from '../auth/auth.module';

// Services
import { AddNewPostService } from './components/addNewPost/addNewPost.service';

export const MODULE_DECLARATIONS = [
  AdminComponent,
  AddNewPostComponent,
  WysiwygComponent,
  AdminHeaderComponent
];

export const MODULE_IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgxEditorModule,
  HttpClientModule
];

const ROUTING_MODULE_IMPORTS = [
  AdminRoutingModule
];

const STORE_IMPORTS = [
  EffectsModule.forFeature(adminEffects)
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
    AddNewPostService
  ]
})
export class AdminModule {
  constructor() { }
}
