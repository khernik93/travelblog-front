import { storiesOf } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { MODULE_IMPORTS, MODULE_DECLARATIONS } from '../modules/content/content.module';
import { SelfieComponent } from '../modules/content/components/selfie/selfie.component';

storiesOf('Selfie', module)
  .add('Default', () => ({
    component: SelfieComponent,
    moduleMetadata: {
      imports: [
        ...MODULE_IMPORTS,
        RouterTestingModule
      ],
      schemas: [],
      declarations: MODULE_DECLARATIONS,
      providers: [],
    }
  }));
