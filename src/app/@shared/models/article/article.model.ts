import { Promotion } from "../promo/promo.model";

export class Article {
    _id: string;
    label: string;
    images: string[];
    description: string;
    category: string[];
    price: number;
    promotion: Promotion;
    categoryPromotion: Promotion;

  constructor(options: {
    _id: string;
    label: string;
    images: string[];
    description: string;
    category: string[];
    price: number;
    promotion: Promotion;
    categoryPromotion: Promotion;
  }) {
    this._id = options._id;
    this.label = options.label;
    this.images = options.images;
    this.description = options.description;
    this.category = options.category;
    this.price = options.price;
    this.promotion = options.promotion;
    this.categoryPromotion = options.categoryPromotion;
  }
}
