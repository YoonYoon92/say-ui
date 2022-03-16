declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CloseBefProfitInqComponent } from './closeBefProfitInq.component';

@NgModule({
	declarations: [
		CloseBefProfitInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class CloseBefProfitInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { CloseBefProfitInqComponent } from '../../grop/menu/closeBefProfitInq/closeBefProfitInq.component';
 * { id : 'CloseBefProfitInq',        component : CloseBefProfitInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { CloseBefProfitInqModule } from '../../grop/menu/closeBefProfitInq/closeBefProfitInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "CloseBefProfitInq", name: "CloseBefProfitInq", text: "CloseBefProfitInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */