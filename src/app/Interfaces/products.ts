export interface Products {
  current_page: number;
  total: number;
  total_pages: number;
  data: Data[];
}
export interface Data {
  _id: string;
  product_id: string;
  name: string;
  detail: string;
  image: string;
  cost: number; //ต้นทุน
  price: number; //ราคา
  categorys: Category; //หมวดหมู่
  stock: number; //จำนวน
  units: Unit; //หน่วย
  weight: number; //น้ำหนัก
  barcode_code: string; //บาร์โค้ด (กำหนดเอง)
  cost_discount_price: number;
  min_stock: number; //แจ้งเตือน < น้อยกว่า
  enable_rounding: boolean; //เปิดใช้งานปัดเศษ
  brand: Brand;
}
export interface Unit {
  _id: number;
  name: string;
}
export interface Brand {
  _id: number;
  name: string;
}
export interface Category {
  _id: number;
  name: string;
}
