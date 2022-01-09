export interface CreateOrderDto{
    status: string;
    price: number;
    tableId: number;
    waiterId: number;
    dateOfOrder: string;
}

export interface OrderDto{
    id: number;
    status: string;
    price: number;
    tableId: number;
    waiterId: number;
    dateOfOrder: string;
}