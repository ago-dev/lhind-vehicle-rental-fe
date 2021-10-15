import { PageSortModel } from "./page-sort.model";
import { PageableModel } from "./pageable.model";
import { ApplicationRes } from './application-res.model';

export interface ApplicationRequestListModel {
    content: ApplicationRes[];
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