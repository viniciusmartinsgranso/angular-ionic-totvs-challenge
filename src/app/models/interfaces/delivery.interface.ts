import { LocationInterface } from "./location.interface";
import { StatusEnum } from "../enums/status.enum";
import { UserInterface } from "./user.interface";

export interface DeliveryInterface {
  id: string;
  cliente_destino: LocationInterface,
  cliente_origem: LocationInterface,
  documento: string;
  motorista: UserInterface,
  status_entrega: StatusEnum;
}
