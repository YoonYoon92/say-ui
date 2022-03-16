declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfitAnalysisOfMarginRateChgComponent } from './profitAnalysisOfMarginRateChg.component';
import { SearchClassModule } from 'src/app/component/searchClass/searchClass.module';

@NgModule({
	declarations: [
		ProfitAnalysisOfMarginRateChgComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule,
		SearchClassModule
	],
	providers: [
	]
})

export class ProfitAnalysisOfMarginRateChgModule { }

/**
 * @copy to "tab-components.ts"
 * import { ProfitAnalysisOfMarginRateChgComponent } from '../../spf/selng/profitAnalysisOfMarginRateChg/profitAnalysisOfMarginRateChg.component';
 * { id : 'ProfitAnalysisOfMarginRateChg',        component : ProfitAnalysisOfMarginRateChgComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { ProfitAnalysisOfMarginRateChgModule } from '../../spf/selng/profitAnalysisOfMarginRateChg/profitAnalysisOfMarginRateChg.module';
 */

/**
 * @copy to "env.service.ts" (개발 & 테스트때만)
 * {
 * 	id: "ProfitAnalysisOfMarginRateChg", name: "ProfitAnalysisOfMarginRateChg", text: "마진율 조정 이익 분석", iconCls: "x-fa fa-home", leaf: true
 * }
 */