import { ApplicationRequest } from "./application-request.model";
import { PageSortModel } from "./page-sort.model";
import { PageableModel } from "./pageable.model";

export interface ApplicationRequestListModel {
    content: ApplicationRequest[];
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