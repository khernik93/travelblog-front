import { createFeatureSelector } from '@ngrx/store';
import { ContentState } from './content.reducers';

export const selectContent = createFeatureSelector<ContentState>('content');
