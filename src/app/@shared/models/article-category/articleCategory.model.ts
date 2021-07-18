export class ArticleCategory {
    _id: string;
    label: string;
    main_image: string;
    description: string;

  constructor(options: {
    _id: string;
    label: string;
    main_image: string;
    description: string;
  }) {
    this._id = options._id;
    this.label = options.label;
    this.main_image = options.main_image;
    this.description = options.description;
  }
}
