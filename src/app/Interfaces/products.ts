export interface Products {
  id: number;
  name: string;
  image: string;
  cost: number;//ต้นทุน
  price: number;//ราคา
  category: string; //หมวดหมู่
  stock: number;//จำนวน
  unit: number;//หน่วย
  weight: number;//น้ำหนัก
  barcode_code: string; //บาร์โค้ด (กำหนดเอง)
  cost_discount_price: number;
  min_stock: number; //แจ้งเตือน < น้อยกว่า
  enable_rounding: boolean; //เปิดใช้งานปัดเศษ
}
export interface Unit {
  id: number;
  name: number;
}
