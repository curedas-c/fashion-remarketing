export class Promotion {
    id: string;
    label: string;
    main_image: string;
    discountEndDate: string;
    discountPercentage: number;
    discountPrice: number;
    categoryIDs: string[];
    articleIDs: string[];

  constructor(options: {
    id: string;
    label: string;
    main_image: string;
    discountEndDate: string;
    discountPercentage: number;
    discountPrice: number;
    categoryIDs: string[];
    articleIDs: string[];
  }) {
    this.id = options.id;
    this.label = options.label;
    this.main_image = options.main_image;
    this.discountPercentage = options.discountPercentage;
    this.discountEndDate = options.discountEndDate;
    this.discountPrice = options.discountPrice;
    this.categoryIDs = options.categoryIDs;
    this.articleIDs = options.articleIDs;
  }
}
