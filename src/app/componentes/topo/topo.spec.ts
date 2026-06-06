import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Topo } from './topo';

describe('Topo', () => {
  let component: Topo;
  let fixture: ComponentFixture<Topo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Topo],
    }).compileComponents();

    fixture = TestBed.createComponent(Topo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
