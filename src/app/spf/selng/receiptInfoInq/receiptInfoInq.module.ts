declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReceiptInfoInqComponent } from './receiptInfoInq.component';
import { SearchReceiptModule } from 'src/app/component/searchReceipt/searchReceipt.module';

@NgModule({
	declarations: [
		ReceiptInfoInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule,
		SearchReceiptModule
	],
	providers: [
	]
})

export class ReceiptInfoInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { ReceiptInfoInqComponent } from '../../grop/menu/receiptInfoInq/receiptInfoInq.component';
 * { id : 'ReceiptInfoInq',        component : ReceiptInfoInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { ReceiptInfoInqModule } from '../../grop/menu/receiptInfoInq/receiptInfoInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "ReceiptInfoInq", name: "ReceiptInfoInq", text: "ReceiptInfoInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */