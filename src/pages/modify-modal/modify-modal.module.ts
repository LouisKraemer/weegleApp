import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyModalPage } from './modify-modal';

@NgModule({
  declarations: [
    ModifyModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyModalPage),
  ],
  exports: [
    ModifyModalPage
  ]
})
export class ModifyModalPageModule {}
