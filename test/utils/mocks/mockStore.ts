import { BehaviorSubject, Observable } from 'rxjs';
import { select } from '@ngrx/store';

export class MockStore<T> {
  
  private state: BehaviorSubject<T> = new BehaviorSubject(undefined);

  setState(data: T) {
    this.state.next(data);
  }

  select(selector: any): Observable<T[any]> {
    return this.state.pipe(select(selector));
  }

  dispatch(action: any) {}

}
