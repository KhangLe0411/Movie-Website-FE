import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieWatchingComponent } from './movie-watching.component';

describe('MovieWatchingComponent', () => {
  let component: MovieWatchingComponent;
  let fixture: ComponentFixture<MovieWatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieWatchingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieWatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
