import { Component, Input } from '@angular/core';
import { colorByStatus, StatusEnum } from "../../models/enums/status.enum";
import { IonicModule } from "@ionic/angular";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-grid-content',
  templateUrl: './grid-content.component.html',
  styleUrls: ['./grid-content.component.scss'],
  imports: [
    IonicModule,
    NgClass
  ],
  standalone: true
})
export class GridContentComponent {

  //#region Decorators Properties

  @Input({ required: true })
  public rows: string[] = [];

  @Input({ required: true })
  public status: StatusEnum = StatusEnum.INSUCESSO;

  //#endregion

  //#region Public Properties

  protected readonly colorByStatus = colorByStatus;

  //#endregion
}
