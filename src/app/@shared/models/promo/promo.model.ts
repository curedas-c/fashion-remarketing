export class Promotion {
    _id: string;
    label: string;
    main_image: string;
    endDate: string;
    percentage: number;
    fixedPrice: number;
    category: string[];
    articles: string[];

  constructor(options: {
    _id: string;
    label: string;
    main_image: string;
    endDate: string;
    percentage: number;
    fixedPrice: number;
    category: string[];
    articles: string[];
  }) {
    this._id = options._id;
    this.label = options.label;
    this.main_image = options.main_image;
    this.percentage = options.percentage;
    this.endDate = options.endDate;
    this.fixedPrice = options.fixedPrice;
    this.category = options.category;
    this.articles = options.articles;
  }
}
