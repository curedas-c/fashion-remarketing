import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatChipsModule } from '@angular/material/chips';
import { ChipSelectorComponent } from '@shared/components/chip-selector/chip-selector.component';

const IMPORTS = [
  MatChipsModule
];
@NgModule({
  declarations: [ChipSelectorComponent],
  imports: [CommonModule, ...IMPORTS],
  exports: [...IMPORTS, ChipSelectorComponent],
  providers: [],
})
export class ChipSelectorModule {}
