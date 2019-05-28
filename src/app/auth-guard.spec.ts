import { AuthGuard } from './auth-guard';
import {Router} from '@angular/router';

describe('AuthGuard', () => {
  it('should create an instance', () => {
    expect(new AuthGuard()).toBeTruthy();
  });
});
