declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LastYearCntstWeekSaleNewsComponent } from './lastYearCntstWeekSaleNews.component';

@NgModule({
	declarations: [
		LastYearCntstWeekSaleNewsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class LastYearCntstWeekSaleNewsModule { }

/**
 * @copy to "tab-components.ts"
 * import { LastYearCntstWeekSaleNewsComponent } from '../../spf/saleNews/lastYearCntstWeekSaleNews/lastYearCntstWeekSaleNews.component';
 * { id : 'LastYearCntstWeekSaleNews',        component : LastYearCntstWeekSaleNewsComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { LastYearCntstWeekSaleNewsModule } from '../../spf/saleNews/lastYearCntstWeekSaleNews/lastYearCntstWeekSaleNews.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "LastYearCntstWeekSaleNews", name: "LastYearCntstWeekSaleNews", text: "전년대비주간매출속보", iconCls: "x-fa fa-home", leaf: true
 * }
 */