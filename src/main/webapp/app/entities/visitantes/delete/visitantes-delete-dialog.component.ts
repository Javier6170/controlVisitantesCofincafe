import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVisitantes } from '../visitantes.model';
import { VisitantesService } from '../service/visitantes.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './visitantes-delete-dialog.component.html',
})
export class VisitantesDeleteDialogComponent {
  visitantes?: IVisitantes;

  constructor(protected visitantesService: VisitantesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.visitantesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
