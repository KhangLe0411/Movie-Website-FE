import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAdminDetailComponent } from './movie-admin-detail.component';

describe('MovieAdminDetailComponent', () => {
  let component: MovieAdminDetailComponent;
  let fixture: ComponentFixture<MovieAdminDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieAdminDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
