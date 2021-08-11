import { Component, OnInit } from '@angular/core';
import { MAIN_MENU } from '../menu';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { menu } from '@shared/models/menu.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  opened: boolean;
  menuButtonVisible: boolean;
  menu: menu[] = MAIN_MENU;

  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.menuButtonVisible = false;
          this.opened = true;
        } else {
          this.menuButtonVisible = true;
          this.opened = false;
        }
      });
  }

  closeMenu() {
    if (this.menuButtonVisible) {
      this.opened = false;
    }
  }
}
