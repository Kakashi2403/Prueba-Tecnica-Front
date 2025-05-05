import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatevmsComponent } from './createvms.component';

describe('CreatevmsComponent', () => {
  let component: CreatevmsComponent;
  let fixture: ComponentFixture<CreatevmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatevmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatevmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
