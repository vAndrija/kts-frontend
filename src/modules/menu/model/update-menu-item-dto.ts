export interface UpdateMenuItemDto {
    name: string,
    description: string,
    type: string,
    category: string,
    menuId: string,
    accepted: boolean,
    preparationTime: number,
    imageName: string
}