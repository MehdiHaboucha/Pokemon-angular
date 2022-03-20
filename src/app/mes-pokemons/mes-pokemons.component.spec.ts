import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesPokemonsComponent } from './mes-pokemons.component';

describe('MesPokemonsComponent', () => {
  let component: MesPokemonsComponent;
  let fixture: ComponentFixture<MesPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesPokemonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
