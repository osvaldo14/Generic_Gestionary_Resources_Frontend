import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceCreationComponent } from './choice-creation.component';

describe('ChoiceCreationComponent', () => {
  let component: ChoiceCreationComponent;
  let fixture: ComponentFixture<ChoiceCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
