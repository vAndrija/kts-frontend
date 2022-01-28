export interface UpdateMenuItemDto {
    name: string,
    description: string,
    type: string,
    category: string,
    menuId: string,
    accepted: boolean,
    preparationTime: Number,
    imageName: string
}