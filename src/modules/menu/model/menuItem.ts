import { PriceItem } from "./priceItem";

export interface MenuItem {
    name: string,
    description: string,
    type: Number,
    category: string,
    preparationTime: Number,
    priceItemDto: PriceItem
  }