declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuyReqFormInqComponent } from './buyReqFormInq.component';

@NgModule({
	declarations: [
		BuyReqFormInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class BuyReqFormInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { BuyReqFormInqComponent } from '../../grop/menu/buyReqFormInq/buyReqFormInq.component';
 * { id : 'BuyReqFormInq',        component : BuyReqFormInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { BuyReqFormInqModule } from '../../grop/menu/buyReqFormInq/buyReqFormInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "BuyReqFormInq", name: "BuyReqFormInq", text: "BuyReqFormInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */