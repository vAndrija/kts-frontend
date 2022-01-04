import { PAGE_SIZE } from "../constants/constants";

export class Pagination {
    pageSize: number = PAGE_SIZE;
    currentPage: number = 1;
    totalPages: number = 1;
}