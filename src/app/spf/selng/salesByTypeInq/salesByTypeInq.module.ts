declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesByTypeInqComponent } from './salesByTypeInq.component';

@NgModule({
	declarations: [
		SalesByTypeInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class SalesByTypeInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { SalesByTypeInqComponent } from '../../spf/selng/salesByTypeInq/salesByTypeInq.component';
 * { id : 'SalesByTypeInq',        component : SalesByTypeInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { SalesByTypeInqModule } from '../../spf/selng/salesByTypeInq/salesByTypeInq.module';
 */

/**
 * @copy to "env.service.ts" (개발 & 테스트때만)
 * {
 * 	id: "SalesByTypeInq", name: "SalesByTypeInq", text: "형태별 매출 조회", iconCls: "x-fa fa-home", leaf: true
 * }
 */