import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VisitantesDetailComponent } from './visitantes-detail.component';

describe('Visitantes Management Detail Component', () => {
  let comp: VisitantesDetailComponent;
  let fixture: ComponentFixture<VisitantesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitantesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ visitantes: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(VisitantesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(VisitantesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load visitantes on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.visitantes).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
