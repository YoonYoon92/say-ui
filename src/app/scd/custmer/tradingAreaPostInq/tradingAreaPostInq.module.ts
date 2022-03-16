declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TradingAreaPostInqComponent } from './tradingAreaPostInq.component';

@NgModule({
	declarations: [
		TradingAreaPostInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class TradingAreaPostInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { TradingAreaPostInqComponent } from '../../grop/menu/tradingAreaPostInq/tradingAreaPostInq.component';
 * { id : 'TradingAreaPostInq',        component : TradingAreaPostInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { TradingAreaPostInqModule } from '../../grop/menu/tradingAreaPostInq/tradingAreaPostInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "TradingAreaPostInq", name: "TradingAreaPostInq", text: "TradingAreaPostInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */