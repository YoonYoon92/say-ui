declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GiftEventInqComponent } from './giftEventInq.component';

@NgModule({
	declarations: [
		GiftEventInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class GiftEventInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { GiftEventInqComponent } from '../../grop/menu/giftEventInq/giftEventInq.component';
 * { id : 'GiftEventInq',        component : GiftEventInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { GiftEventInqModule } from '../../grop/menu/giftEventInq/giftEventInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "GiftEventInq", name: "GiftEventInq", text: "GiftEventInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */