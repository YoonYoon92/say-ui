declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnHandTimeSaleNewsComponent } from './onHandTimeSaleNews.component';

@NgModule({
	declarations: [
		OnHandTimeSaleNewsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class OnHandTimeSaleNewsModule { }

/**
 * @copy to "tab-components.ts"
 * import { OnHandTimeSaleNewsComponent } from '../../spf/saleNews/onHandTimeSaleNews/onHandTimeSaleNews.component';
 * { id : 'OnHandTimeSaleNews',        component : OnHandTimeSaleNewsComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { OnHandTimeSaleNewsModule } from '../../spf/saleNews/onHandTimeSaleNews/onHandTimeSaleNews.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "OnHandTimeSaleNews", name: "OnHandTimeSaleNews", text: "시재별시간대매출속보", iconCls: "x-fa fa-home", leaf: true
 * }
 */