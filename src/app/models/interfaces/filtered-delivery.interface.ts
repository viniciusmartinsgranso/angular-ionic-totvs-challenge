import { DeliveryInterface } from "./delivery.interface";

export interface FilteredDeliveryInterface {
  PENDENTE: DeliveryInterface[];
  ENTREGUE: DeliveryInterface[];
  INSUCESSO: DeliveryInterface[];
}
