import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleShell } from './vehicle-shell';

describe('VehicleMainPage', () => {
  let component: VehicleShell;
  let fixture: ComponentFixture<VehicleShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleShell],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
