import { Article } from '../article/article.model';
import { PaymentType } from '../payment/paymentType.enum';

class Product {
    product: Article;
    quantity: number;
}

export class Order {
    _id: string;
    clientName: string;
    clientContact: string;
    clientLocalization: string;
    paymentType: PaymentType;
    total: number;
    products: Product[];
    createdAt: string;

  constructor(options: {
    _id: string;
    clientName: string;
    clientContact: string;
    clientLocalization: string;
    paymentType: PaymentType;
    total: number;
    products: Product[];
    createdAt: string;
  }) {
    this._id = options._id;
    this.clientName = options.clientName;
    this.clientContact = options.clientContact;
    this.clientLocalization = options.clientLocalization;
    this.paymentType = options.paymentType;
    this.total = options.total;
    this.products = options.products;
    this.createdAt = options.createdAt;
  }
}
