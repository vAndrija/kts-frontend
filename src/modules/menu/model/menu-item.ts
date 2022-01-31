import { Menu } from "./menu";
import { PriceItem } from "./price-item";

export interface MenuItem {
    id: string,
    name: string,
    description: string,
    type: string,
    category: string,
    preparationTime: number,
    priceItemDto: PriceItem,
    menuDto: Menu,
    accepted: boolean,
    imageName: string
  }