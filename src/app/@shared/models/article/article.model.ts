import { Promotion } from "../promo/promo.model";

export class Article {
    id: string;
    label: string;
    images: string[];
    description: string;
    categories: string[];
    price: number;
    promotion: Promotion;
    categoryPromotion: Promotion;

  constructor(options: {
    id: string;
    label: string;
    images: string[];
    description: string;
    categories: string[];
    price: number;
    promotion: Promotion;
    categoryPromotion: Promotion;
  }) {
    this.id = options.id;
    this.label = options.label;
    this.images = options.images;
    this.description = options.description;
    this.categories = options.categories;
    this.price = options.price;
    this.promotion = options.promotion;
    this.categoryPromotion = options.categoryPromotion;
  }
}
