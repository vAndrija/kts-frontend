import { Menu } from "./menu";
import { PriceItem } from "./priceItem";

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