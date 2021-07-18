export class Promotion {
    id: string;
    label: string;
    main_image: string;
    endDate: string;
    percentage: number;
    fixedPrice: number;
    categories: string[];
    articles: string[];

  constructor(options: {
    id: string;
    label: string;
    main_image: string;
    endDate: string;
    percentage: number;
    fixedPrice: number;
    categories: string[];
    articles: string[];
  }) {
    this.id = options.id;
    this.label = options.label;
    this.main_image = options.main_image;
    this.percentage = options.percentage;
    this.endDate = options.endDate;
    this.fixedPrice = options.fixedPrice;
    this.categories = options.categories;
    this.articles = options.articles;
  }
}
