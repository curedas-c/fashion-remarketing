export class Article {
    id: string | number;
    label: string;
    images: string[];
    description: string;
    categoryIDs: string[];
    price: number;
    onDiscount: boolean;
    discountEndDate: string;
    discountPercentage: number;
    discountPrice: number;

  constructor(options: {
    id: string | number;
    label: string;
    images: string[];
    description: string;
    categoryIDs: string[];
    price: number;
    onDiscount: boolean;
    discountEndDate: string;
    discountPercentage: number;
    discountPrice: number;
  }) {
    this.id = options.id;
    this.label = options.label;
    this.images = options.images;
    this.description = options.description;
    this.categoryIDs = options.categoryIDs;
    this.price = options.price;
    this.onDiscount = options.onDiscount;
    this.discountPercentage = options.discountPercentage;
    this.discountEndDate = options.discountEndDate;
    this.discountPrice = options.discountPrice;
  }
}
