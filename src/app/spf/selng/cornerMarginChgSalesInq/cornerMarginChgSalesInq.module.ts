declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CornerMarginChgSalesInqComponent } from './cornerMarginChgSalesInq.component';
import { SearchConerModule } from 'src/app/component/searchConer/searchConer.module';

@NgModule({
	declarations: [
		CornerMarginChgSalesInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule,
		SearchConerModule
	],
	providers: [
	]
})

export class CornerMarginChgSalesInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { CornerMarginChgSalesInqComponent } from '../../spf/selng/cornerMarginChgSalesInq/cornerMarginChgSalesInq.component';
 * { id : 'CornerMarginChgSalesInq',        component : CornerMarginChgSalesInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { CornerMarginChgSalesInqModule } from '../../spf/selng/cornerMarginChgSalesInq/cornerMarginChgSalesInq.module';
 */

/**
 * @copy to "env.service.ts" (개발 & 테스트때만)
 * {
 * 	id: "CornerMarginChgSalesInq", name: "CornerMarginChgSalesInq", text: "코너 마진 변경 매출 조회", iconCls: "x-fa fa-home", leaf: true
 * }
 */