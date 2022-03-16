declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalePriceChgReqFormInqComponent } from './salePriceChgReqFormInq.component';

@NgModule({
	declarations: [
		SalePriceChgReqFormInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class SalePriceChgReqFormInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { SalePriceChgReqFormInqComponent } from '../../grop/menu/salePriceChgReqFormInq/salePriceChgReqFormInq.component';
 * { id : 'SalePriceChgReqFormInq',        component : SalePriceChgReqFormInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { SalePriceChgReqFormInqModule } from '../../grop/menu/salePriceChgReqFormInq/salePriceChgReqFormInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "SalePriceChgReqFormInq", name: "SalePriceChgReqFormInq", text: "SalePriceChgReqFormInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */