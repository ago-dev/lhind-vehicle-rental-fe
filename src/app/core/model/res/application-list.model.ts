import { PageSortModel } from "./page-sort.model";
import { PageableModel } from "./pageable.model";
import { RentApplication } from "./rent-application.model";

export interface ApplicationListModel {
    content: RentApplication[];
    pageable: PageableModel;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: PageSortModel;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}