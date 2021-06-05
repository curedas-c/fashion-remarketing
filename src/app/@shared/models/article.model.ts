export class Article {
    id: string | number;
    label: string;
    images: string[];
    description: string;
    categoryIDs: string[];
    price: number;

  constructor(options: {
    id: string | number;
    label: string;
    images: string[];
    description: string;
    categoryIDs: string[];
    price: number;
  }) {
    this.id = options.id;
    this.label = options.label;
    this.images = options.images;
    this.description = options.description;
    this.categoryIDs = options.categoryIDs;
    this.price = options.price;
  }
}
