import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartDemoComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: LineChartDemoComponent;
  let fixture: ComponentFixture<LineChartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
