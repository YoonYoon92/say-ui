declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SingleItemSalesInqComponent } from './singleItemSalesInq.component';
import { SearchCcpyModule } from 'src/app/component/searchCcpy/searchCcpy.module';

@NgModule({
	declarations: [
		SingleItemSalesInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule,
		SearchCcpyModule
	],
	providers: [
	]
})

export class SingleItemSalesInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { SingleItemSalesInqComponent } from '../../spf/selng/singleItemSalesInq/singleItemSalesInq.component';
 * { id : 'SingleItemSalesInq',        component : SingleItemSalesInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { SingleItemSalesInqModule } from '../../spf/selng/singleItemSalesInq/singleItemSalesInq.module';
 */

/**
 * @copy to "env.service.ts" (개발 & 테스트때만)
 * {
 * 	id: "SingleItemSalesInq", name: "SingleItemSalesInq", text: "단품 매출 조회", iconCls: "x-fa fa-home", leaf: true
 * }
 */