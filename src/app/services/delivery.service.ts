import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, take } from "rxjs";
import { DeliveryInterface } from "../models/interfaces/delivery.interface";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private readonly http: HttpClient = inject(HttpClient);

  public fetchDelivery() {
    return this.http.get<DeliveryInterface[]>(environment.routes.delivery);
  }

  private readonly currentData$: BehaviorSubject<DeliveryInterface[]> =
    new BehaviorSubject<DeliveryInterface[]>([]);

  public getCurrentData$(): Observable<DeliveryInterface[] | null> {
    return this.currentData$.asObservable();
  }

  public setData(data: DeliveryInterface[]): void {
    return this.currentData$.next(data);
  }

  public getCurrentDelivery(): DeliveryInterface[] {
    return this.currentData$.getValue();
  }

}
