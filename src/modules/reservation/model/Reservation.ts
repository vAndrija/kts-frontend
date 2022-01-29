export interface Reservation {
  id: number,
  name: string,
  durationStart: string,
  durationEnd: string,
  tableId: number
}

export interface ReservationDto {
  name: string,
  durationStart: string,
  durationEnd: string,
  tableId: number
}