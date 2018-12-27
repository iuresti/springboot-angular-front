export class Page<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    },
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  first: boolean;
  number: number;
  numberOfElements: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  empty = true;
}
