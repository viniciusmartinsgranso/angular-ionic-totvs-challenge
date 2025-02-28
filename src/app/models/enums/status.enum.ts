export enum StatusEnum {
  ENTREGUE = 'ENTREGUE',
  INSUCESSO = 'INSUCESSO',
  PENDENTE = 'PENDENTE',
}

export const colorByStatus: Record<StatusEnum, string> = {
  [StatusEnum.INSUCESSO]: 'danger',
  [StatusEnum.PENDENTE]: 'medium',
  [StatusEnum.ENTREGUE]: 'success'
}
