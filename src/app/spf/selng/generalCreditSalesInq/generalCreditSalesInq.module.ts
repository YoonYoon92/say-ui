declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeneralCreditSalesInqComponent } from './generalCreditSalesInq.component';

@NgModule({
	declarations: [
		GeneralCreditSalesInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class GeneralCreditSalesInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { GeneralCreditSalesInqComponent } from '../../spf/selng/generalCreditSalesInq/generalCreditSalesInq.component';
 * { id : 'GeneralCreditSalesInq',        component : GeneralCreditSalesInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { GeneralCreditSalesInqModule } from '../../spf/selng/generalCreditSalesInq/generalCreditSalesInq.module';
 */

/**
 * @copy to "env.service.ts" (개발 & 테스트때만)
 * {
 * 	id: "GeneralCreditSalesInq", name: "GeneralCreditSalesInq", text: "일반외상,사용매출,특판,COD 매출조회", iconCls: "x-fa fa-home", leaf: true
 * }
 */