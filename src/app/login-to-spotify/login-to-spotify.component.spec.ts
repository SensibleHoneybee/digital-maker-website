import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginToSpotifyComponent } from './login-to-spotify.component';

describe('LoginToSpotifyComponent', () => {
  let component: LoginToSpotifyComponent;
  let fixture: ComponentFixture<LoginToSpotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginToSpotifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginToSpotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
