import { AppMatModule } from './app.mat.module';
import { MatIconRegistry } from '@angular/material';

describe('AppMatModule', () => {
  let appMatModule: AppMatModule;
  let iconRegistry: MatIconRegistry;

  beforeEach(() => {
    appMatModule = new AppMatModule(iconRegistry);
  });

  it('should create an instance', () => {
    expect(appMatModule).toBeTruthy();
  });
});
