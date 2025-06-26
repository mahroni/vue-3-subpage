interface IPagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

export interface IResponse<T> {
  data: T;
  meta: IPagination;
}
