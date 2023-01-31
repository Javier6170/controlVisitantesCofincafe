import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { VisitantesService } from '../service/visitantes.service';

import { VisitantesComponent } from './visitantes.component';

describe('Visitantes Management Component', () => {
  let comp: VisitantesComponent;
  let fixture: ComponentFixture<VisitantesComponent>;
  let service: VisitantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'visitantes', component: VisitantesComponent }]), HttpClientTestingModule],
      declarations: [VisitantesComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(VisitantesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VisitantesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VisitantesService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.visitantes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to visitantesService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getVisitantesIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getVisitantesIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
