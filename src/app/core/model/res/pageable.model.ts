import { PageSortModel } from "./page-sort.model";

export interface PageableModel {
  sort: PageSortModel;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}
