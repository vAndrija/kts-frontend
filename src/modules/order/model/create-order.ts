export interface CreateOrderDto{
    status: string;
    price: number;
    tableId: number;
    waiterId: number;
    dateOfOrder: string;
}
