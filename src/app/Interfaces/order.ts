export interface Orders {
  current_page: number;
  total: number;
  total_pages: number;
  data: OrderData[];
}
export interface OrderData {
  sell: string;
  customer: string;
  orderItems: OrderItems[];
  discount: {
    discount_type: string; //%,฿
    discount_price: number; //เงินลด
  };
  coupon: {
    coupon_code: string;
    discount: number;
  };
  vat: number;
  payment_method: string;
  payment_result: {
    resultCode: string;
    amount: string;
    referenceNo: string;
    gbpReferenceNo: string;
    statusText: string;
    imageSlip: string;
    dateSlip: string;
  };
  price: number;
  totalPrice: number;
}

export interface OrderItems {
  barcode_code: string;
  product_id: string;
  product_name: string;
  product_image: string;
  product_cost: number; //ต้นทุน
  product_price: number; //ราคาต่อหน่วย
  product_qty: number;
  total_price: number; //ราคารวม
}
