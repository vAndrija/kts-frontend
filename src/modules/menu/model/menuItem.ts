import { PriceItem } from "./priceItem";

export interface MenuItem {
    name: string,
    description: string,
    type: Number,
    category: Number,
    preparationTime: Number,
    priceItemDto: PriceItem
  }