import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBroadcastComponent } from './user-broadcast.component';

describe('UserBroadcastComponent', () => {
  let component: UserBroadcastComponent;
  let fixture: ComponentFixture<UserBroadcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBroadcastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
