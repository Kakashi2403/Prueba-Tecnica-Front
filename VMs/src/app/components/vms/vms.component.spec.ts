import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VMsComponent } from './vms.component';

describe('VMsComponent', () => {
  let component: VMsComponent;
  let fixture: ComponentFixture<VMsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VMsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VMsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
