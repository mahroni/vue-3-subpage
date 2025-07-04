export interface IPagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

export interface IPagination2 {
  limit: number;
  page: number;
  total: number;
  total_page: number;
}

export interface IResponse<T> {
  data: T;
  meta: IPagination;
}

export interface IParams {
  limit?: number;
  page?: number;
  search?: string;
}
