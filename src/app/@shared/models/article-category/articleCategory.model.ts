export class ArticleCategory {
    id: string | number;
    label: string;
    main_image: string;
    description: string;
    onDiscount: boolean;
    discountEndDate: string;
    discountPercentage: number;

  constructor(options: {
    id: string | number;
    label: string;
    main_image: string;
    description: string;
    onDiscount: boolean;
    discountEndDate: string;
    discountPercentage: number;
  }) {
    this.id = options.id;
    this.label = options.label;
    this.main_image = options.main_image;
    this.description = options.description;
    this.onDiscount = options.onDiscount;
    this.discountPercentage = options.discountPercentage;
    this.discountEndDate = options.discountEndDate;
  }
}
