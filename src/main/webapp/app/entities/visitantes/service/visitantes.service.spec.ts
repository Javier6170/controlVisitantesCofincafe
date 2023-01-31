import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IVisitantes } from '../visitantes.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../visitantes.test-samples';

import { VisitantesService, RestVisitantes } from './visitantes.service';

const requireRestSample: RestVisitantes = {
  ...sampleWithRequiredData,
  fecha: sampleWithRequiredData.fecha?.format(DATE_FORMAT),
};

describe('Visitantes Service', () => {
  let service: VisitantesService;
  let httpMock: HttpTestingController;
  let expectedResult: IVisitantes | IVisitantes[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VisitantesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Visitantes', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const visitantes = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(visitantes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Visitantes', () => {
      const visitantes = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(visitantes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Visitantes', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Visitantes', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Visitantes', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addVisitantesToCollectionIfMissing', () => {
      it('should add a Visitantes to an empty array', () => {
        const visitantes: IVisitantes = sampleWithRequiredData;
        expectedResult = service.addVisitantesToCollectionIfMissing([], visitantes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(visitantes);
      });

      it('should not add a Visitantes to an array that contains it', () => {
        const visitantes: IVisitantes = sampleWithRequiredData;
        const visitantesCollection: IVisitantes[] = [
          {
            ...visitantes,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addVisitantesToCollectionIfMissing(visitantesCollection, visitantes);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Visitantes to an array that doesn't contain it", () => {
        const visitantes: IVisitantes = sampleWithRequiredData;
        const visitantesCollection: IVisitantes[] = [sampleWithPartialData];
        expectedResult = service.addVisitantesToCollectionIfMissing(visitantesCollection, visitantes);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(visitantes);
      });

      it('should add only unique Visitantes to an array', () => {
        const visitantesArray: IVisitantes[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const visitantesCollection: IVisitantes[] = [sampleWithRequiredData];
        expectedResult = service.addVisitantesToCollectionIfMissing(visitantesCollection, ...visitantesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const visitantes: IVisitantes = sampleWithRequiredData;
        const visitantes2: IVisitantes = sampleWithPartialData;
        expectedResult = service.addVisitantesToCollectionIfMissing([], visitantes, visitantes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(visitantes);
        expect(expectedResult).toContain(visitantes2);
      });

      it('should accept null and undefined values', () => {
        const visitantes: IVisitantes = sampleWithRequiredData;
        expectedResult = service.addVisitantesToCollectionIfMissing([], null, visitantes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(visitantes);
      });

      it('should return initial array if no Visitantes is added', () => {
        const visitantesCollection: IVisitantes[] = [sampleWithRequiredData];
        expectedResult = service.addVisitantesToCollectionIfMissing(visitantesCollection, undefined, null);
        expect(expectedResult).toEqual(visitantesCollection);
      });
    });

    describe('compareVisitantes', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareVisitantes(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareVisitantes(entity1, entity2);
        const compareResult2 = service.compareVisitantes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareVisitantes(entity1, entity2);
        const compareResult2 = service.compareVisitantes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareVisitantes(entity1, entity2);
        const compareResult2 = service.compareVisitantes(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
