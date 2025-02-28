import { Component, inject } from '@angular/core';
import { ToastController } from "@ionic/angular";
import { DeliveryService } from "./services/delivery.service";
import { take } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  private readonly deliveryService: DeliveryService = inject(DeliveryService);

  private readonly toast: ToastController = inject(ToastController);

  constructor() {
    this.deliveryService.fetchDelivery().pipe(take(1)).subscribe({
      next: data => {
        this.deliveryService.setData(data)
      },
      error: async (error) => {
        await this.toast.create({ message: error.message });
      },
    });
  }
}
