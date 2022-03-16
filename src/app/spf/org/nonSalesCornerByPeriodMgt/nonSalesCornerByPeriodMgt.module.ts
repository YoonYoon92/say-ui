declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NonSalesCornerByPeriodMgtComponent } from './nonSalesCornerByPeriodMgt.component';

@NgModule({
	declarations: [
		NonSalesCornerByPeriodMgtComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class NonSalesCornerByPeriodMgtModule { }

/**
 * @copy to "tab-components.ts"
 * import { NonSalesCornerByPeriodMgtComponent } from '../../spf/org/nonSalesCornerByPeriodMgt/nonSalesCornerByPeriodMgt.component';
 * { id : 'NonSalesCornerByPeriodMgt',        component : NonSalesCornerByPeriodMgtComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { NonSalesCornerByPeriodMgtModule } from '../../spf/org/nonSalesCornerByPeriodMgt/nonSalesCornerByPeriodMgt.module';
 */

/**
 * @copy to "env.service.ts" (개발 & 테스트때만)
 * {
 * 	id: "NonSalesCornerByPeriodMgt", name: "NonSalesCornerByPeriodMgt", text: "매출 미발생 코너 관리", iconCls: "x-fa fa-home", leaf: true
 * }
 */