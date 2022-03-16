declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarSaleNewsComponent } from './calendarSaleNews.component';

@NgModule({
	declarations: [
		CalendarSaleNewsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class CalendarSaleNewsModule { }

/**
 * @copy to "tab-components.ts"
 * import { CalendarSaleNewsComponent } from '../../spf/saleNews/calendarSaleNews/calendarSaleNews.component';
 * { id : 'CalendarSaleNews',        component : CalendarSaleNewsComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { CalendarSaleNewsModule } from '../../spf/saleNews/calendarSaleNews/calendarSaleNews.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "CalendarSaleNews", name: "CalendarSaleNews", text: "매출속보Calendar", iconCls: "x-fa fa-home", leaf: true
 * }
 */