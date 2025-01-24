export interface RatesRequest {
    page: number;
    pageSize: number;
    hoaId: number;
    onlyOld?: boolean;
}
export interface RatesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Rate[];
}
export type Rate = {
  id: number;
  name: string;
  type: string;
  rate_per_unit: number;
  effective_date: string;
  end_date: string;
  applies_to?: string;
  hoa: number;
};