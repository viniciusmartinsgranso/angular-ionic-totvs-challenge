import { Component, Input } from '@angular/core';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-grid-header',
  templateUrl: './grid-header.component.html',
  styleUrls: ['./grid-header.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class GridHeaderComponent {

  //#region Decorators Properties

  @Input({ required: true })
  public cols: string[] = [];

  //#endregion

}
