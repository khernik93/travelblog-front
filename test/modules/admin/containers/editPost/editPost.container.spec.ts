import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import cloneDeep from 'lodash-es/cloneDeep';
import { ActivatedRoute } from '@angular/router';

import { HeaderState } from '../../../../../src/modules/header/store/header.reducers';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { MODULE_IMPORTS, MODULE_DECLARATIONS } from '../../../../../src/modules/admin/admin.module';
import { State } from '../../../../utils/state/state';
import { EditPostContainer } from '../../../../../src/modules/admin/containers/editPost/editPost.container';
import { AdminStubs } from '../../../../utils/stubs/admin.stubs';
import { WysiwygService } from '../../../../../src/shared/components/wysiwyg/wysiwyg.service';
import { GetTabs } from '../../../../../src/modules/header/containers/menu/store/menu.actions';
import { GetPost } from '../../../../../src/modules/content/containers/singlePost/store/singlePost.actions';

describe('EditPostContainer', () => {

  let store: MockStore<HeaderState>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let wysiwygService: jasmine.SpyObj<WysiwygService>;

  let component: EditPostContainer;
  let fixture: ComponentFixture<EditPostContainer>;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<HeaderState>();
    activatedRoute = AdminStubs.activatedRoute();
    wysiwygService = SharedStubs.getWysiwygServiceStub();

    TestBed.configureTestingModule({
      imports: [...MODULE_IMPORTS, RouterTestingModule],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: WysiwygService, useValue: wysiwygService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostContainer);
    component = fixture.componentInstance;
    store.setState(cloneDeep(State));
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN GetTabs action is dispatched
  `, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new GetTabs());
  });

  it(`
    WHEN the component is loaded
    THEN GetPost action is dispatched
  `, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new GetPost(AdminStubs.postId));
  });

});