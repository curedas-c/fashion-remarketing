export class ArticleCategory {
    id: string | number;
    label: string;
    main_image: string;
    description: string;

  constructor(options: {
    id: string | number;
    label: string;
    main_image: string;
    description: string;
  }) {
    this.id = options.id;
    this.label = options.label;
    this.main_image = options.main_image;
    this.description = options.description;
  }
}
