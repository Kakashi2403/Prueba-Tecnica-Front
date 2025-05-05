export interface PagedList<T> {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    list: T[];
  }