import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesMenuComponent } from './games-menu.component';

describe('GamesMenuComponent', () => {
  let component: GamesMenuComponent;
  let fixture: ComponentFixture<GamesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
