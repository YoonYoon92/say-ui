declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuPlanSaleInqComponent } from './buPlanSaleInq.component';

@NgModule({
	declarations: [
		BuPlanSaleInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class BuPlanSaleInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { BuPlanSaleInqComponent } from '../../grop/menu/buPlanSaleInq/buPlanSaleInq.component';
 * { id : 'BuPlanSaleInq',        component : BuPlanSaleInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { BuPlanSaleInqModule } from '../../grop/menu/buPlanSaleInq/buPlanSaleInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "BuPlanSaleInq", name: "BuPlanSaleInq", text: "BuPlanSaleInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */