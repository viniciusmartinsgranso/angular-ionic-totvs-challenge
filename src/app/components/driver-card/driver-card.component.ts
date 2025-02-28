import { Component, Input } from '@angular/core';
import { FilteredDeliveryInterface } from "../../models/interfaces/filtered-delivery.interface";
import { IonicModule } from "@ionic/angular";
import { GridHeaderComponent } from "../grid-header/grid-header.component";
import { GridContentComponent } from "../grid-content/grid-content.component";
import { KeyValuePipe } from "@angular/common";

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss'],
  imports: [
    IonicModule,
    GridHeaderComponent,
    GridContentComponent,
    KeyValuePipe,
  ],
  standalone: true
})
export class DriverCardComponent {

  //#region Decorators Properties

  @Input({ required: true })
  public driver: Record<string, FilteredDeliveryInterface> = {}

  @Input({ required: true })
  public cols: string[] = [];

  @Input()
  public isDriver: boolean = false;

  //#endregion
}
