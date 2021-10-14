import { UserResModel } from "./user-res.model";
import { PageableModel } from "./pageable.model";
import { PageSortModel } from "./page-sort.model";

export interface UserListModel {
    content: UserResModel[];
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