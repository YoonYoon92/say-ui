declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchReceiptComponent } from './searchReceipt.component';

@NgModule({
	declarations: [
		SearchReceiptComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	],
	exports:[SearchReceiptComponent]
	,
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class SearchReceiptModule { }

//전달 param
// this.SearchReceiptModel.posNum=포스번호
// this.SearchReceiptModel.receiptNum=영수증번호
// this.SearchReceiptModel.jum=점
// this.SearchReceiptModel.startDt=날짜
// this.isDialogShowing = true;

/**
 * @copy to "tab-components.ts"
 * import { SearchReceiptComponent } from '../../grop/menu/searchReceipt/searchReceipt.component';
 * { id : 'SearchReceipt',        component : SearchReceiptComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { SearchReceiptModule } from '../../grop/menu/searchReceipt/searchReceipt.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "SearchReceipt", name: "SearchReceipt", text: "SearchReceipt", iconCls: "x-fa fa-home", leaf: true
 * }
 */