export interface Customer {
  current_page: number;
  total: number;
  total_pages: number;
  data: CustomerData[];
}
export interface CustomerData {
  _id: string;
  member_id: string;
  firstname: string;
  lastname: string;
  sex: string;
  phone: string;
}
