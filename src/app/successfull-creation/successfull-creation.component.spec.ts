import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullCreationComponent } from './successfull-creation.component';

describe('SuccessfullCreationComponent', () => {
  let component: SuccessfullCreationComponent;
  let fixture: ComponentFixture<SuccessfullCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfullCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfullCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
