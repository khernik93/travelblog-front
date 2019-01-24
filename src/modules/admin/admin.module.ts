// Global
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AdminComponent } from './admin.component';
import { AddNewPostComponent } from './components/addNewPost/addNewPost.component';

// Modules
import { AdminRoutingModule } from './routing/adminRouting.module';
import { AuthModule } from '../auth/auth.module';

export const MODULE_DECLARATIONS = [
  AdminComponent,
  AddNewPostComponent
];

export const MODULE_IMPORTS = [
  CommonModule,
  AdminRoutingModule,
  AuthModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: MODULE_DECLARATIONS,
  imports: MODULE_IMPORTS,
  exports: [AdminComponent],
  providers: []
})
export class AdminModule {
  constructor() { }
}
