import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-overview',
  templateUrl: './phone-overview.component.html',
  styleUrls: ['./phone-overview.component.scss']
})
export class PhoneOverviewComponent implements OnInit {

  @Input() title: string = '';
  @Input() text: string = '';
  @Input() image: any;
  //@Output() onSelect = new EventEmitter<any>();
  imagePlaceholder: string = 'assets/images/image_placeholder.png';
  constructor() { }

  ngOnInit(): void {
  }

}
