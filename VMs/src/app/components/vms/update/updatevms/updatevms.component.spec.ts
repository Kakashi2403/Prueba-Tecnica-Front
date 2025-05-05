import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatevmsComponent } from './updatevms.component';

describe('UpdatevmsComponent', () => {
  let component: UpdatevmsComponent;
  let fixture: ComponentFixture<UpdatevmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatevmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatevmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
