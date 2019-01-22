import { createFeatureSelector } from '@ngrx/store';
import { HeaderState } from './header.reducers';

export const selectHeader = createFeatureSelector<HeaderState>('header');
