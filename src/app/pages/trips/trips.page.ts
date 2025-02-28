import { Component, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IonAccordionGroup, IonicModule } from "@ionic/angular";
import { DeliveryInterface } from "../../models/interfaces/delivery.interface";
import { FilteredDeliveryInterface } from "../../models/interfaces/filtered-delivery.interface";
import { DeliveryService } from "../../services/delivery.service";
import { StatusEnum } from "../../models/enums/status.enum";
import { take } from "rxjs";
import { DriverCardComponent } from "../../components/driver-card/driver-card.component";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
  imports: [
    IonicModule,
    DriverCardComponent
  ],
  standalone: true
})
export class TripsPage implements OnInit, OnChanges {

  //#region Dependency Injection

  private readonly deliveryService: DeliveryService = inject(DeliveryService);

  //#endregion

  //#region Decorators Properties

  @ViewChild('accordionGroup', { static: true })
  public accordionGroup!: IonAccordionGroup;

  @Input()
  public data: DeliveryInterface[] = [];

  //#endregion

  //#region Public Properties


  public deliveriesByDrivers: Record<string, FilteredDeliveryInterface> = {};

  public deliveriesByDistricts: Record<string, FilteredDeliveryInterface> = {};

  public isLoading: boolean = false;

  //#endregion

  //#region Life Cycle Events

  public ngOnInit(): void {
    this.isLoading = true;

    this.data = this.deliveryService.getCurrentDelivery();

    if (this.data.length) {
      return this.applyDeliveryReducers();
    }
    
    this.deliveryService.fetchDelivery().pipe(take(1)).subscribe({
      next: data => {
        this.data = data;

        this.applyDeliveryReducers();
      },
      error: error => console.error(error),
      complete: () => this.isLoading = false,
    });

    this.isLoading = false;

    this.accordionGroup.value = 'drivers';
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.deliveriesByDrivers = this.setDeliveriesByDrivers(this.data);
      this.deliveriesByDistricts = this.setDeliveriesByDistricts(this.data);
    }
  }

  //#endregion

  //#region Private Methods

  private applyDeliveryReducers(): void {
    this.deliveriesByDrivers = this.setDeliveriesByDrivers(this.data);
    this.deliveriesByDistricts = this.setDeliveriesByDistricts(this.data);
  }

  private setDeliveriesByDrivers(data: DeliveryInterface[]): Record<string, FilteredDeliveryInterface> {
    return data.reduce((acc, delivery) => {
      const { nome } = delivery.motorista;

      if (!acc[nome]) {
        acc[nome] = {
          [StatusEnum.ENTREGUE]: [],
          [StatusEnum.INSUCESSO]: [],
          [StatusEnum.PENDENTE]: [],
        };
      }

      acc[nome][delivery.status_entrega].push({
        ...delivery
      });

      return acc;
    }, {} as Record<string, FilteredDeliveryInterface>);
  }

  private setDeliveriesByDistricts(data: DeliveryInterface[]): Record<string, FilteredDeliveryInterface> {
    return data.reduce((acc, item) => {
      const { bairro } = item.cliente_destino;

      if (!acc[bairro]) {
        acc[bairro] = {
          [StatusEnum.ENTREGUE]: [],
          [StatusEnum.INSUCESSO]: [],
          [StatusEnum.PENDENTE]: [],
        };
      }

      acc[bairro][item.status_entrega].push({
        ...item
      });

      return acc;
    }, {} as Record<string, FilteredDeliveryInterface>);
  }

  //#endregion

}
