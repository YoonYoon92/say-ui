declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppSayMsgCouponComponent } from './appSayMsgCoupon.component';

@NgModule({
	declarations: [
		AppSayMsgCouponComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class AppSayMsgCouponModule { }
