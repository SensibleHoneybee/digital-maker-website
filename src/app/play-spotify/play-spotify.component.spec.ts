import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaySpotifyComponent } from './play-spotify.component';

describe('PlaySpotifyComponent', () => {
  let component: PlaySpotifyComponent;
  let fixture: ComponentFixture<PlaySpotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaySpotifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaySpotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
