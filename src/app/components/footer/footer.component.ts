import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class FooterComponent {

  //#region Decorators Properties

  @Input({ required: true })
  public page: number = 0;

  @Input({ required: true })
  public totalItems: number = 0;

  @Output()
  public changePage = new EventEmitter<number>();

  //#endregion

  //#region Public Properties

  public itemsPerPage: number = 10;

  //#endregion

  //#region Public Methods

  public previousPage(): void {
    if (this.page > 1) {
      this.changePage.emit(this.page - 1);
    }
  }

  public nextPage(): void {
    if (this.page * this.itemsPerPage < this.totalItems) {
      this.changePage.emit(this.page + 1);
    }
  }

  //#endregion

}
