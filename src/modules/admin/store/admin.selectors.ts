import { createFeatureSelector } from '@ngrx/store';
import { AdminState } from './admin.reducers';

export const selectAdmin = createFeatureSelector<AdminState>('admin');
