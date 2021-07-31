export class Notification {
    _id: string;
    message_title: string;
    message_text: string;
    message_image: string;
    message_name: string;
    schedule_type: string;
    schedule_date: string;
    schedule_time: string;
    schedule_startDate: string;
    schedule_endDate: string;
    link: string;
    target_id: string;
    target: string;
    isActive: boolean;

  constructor(options: {
    _id: string;
    message_title: string;
    message_text: string;
    message_image: string;
    message_name: string;
    schedule_type: string;
    schedule_date: string;
    schedule_time: string;
    schedule_startDate: string;
    schedule_endDate: string;
    link: string;
    target_id: string;
    target: string;
    isActive: boolean;
  }) {
    this._id = options._id;
    this.message_title = options.message_title;
    this.message_text = options.message_text;
    this.message_image = options.message_image;
    this.message_name = options.message_name;
    this.schedule_type = options.schedule_type;
    this.schedule_date = options.schedule_date;
    this.schedule_time = options.schedule_time;
    this.schedule_startDate = options.schedule_startDate;
    this.schedule_endDate = options.schedule_endDate;
    this.link = options.link;
    this.target_id = options.target_id;
    this.target = options.target;
    this.isActive = options.isActive;
  }
}
