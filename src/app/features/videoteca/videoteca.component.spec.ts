import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideotecaComponent } from './videoteca.component';

describe('VideotecaComponent', () => {
  let component: VideotecaComponent;
  let fixture: ComponentFixture<VideotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideotecaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
