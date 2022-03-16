declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TradingAreaMemberInqComponent } from './tradingAreaMemberInq.component';

@NgModule({
	declarations: [
		TradingAreaMemberInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class TradingAreaMemberInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { TradingAreaMemberInqComponent } from '../../grop/menu/tradingAreaMemberInq/tradingAreaMemberInq.component';
 * { id : 'TradingAreaMemberInq',        component : TradingAreaMemberInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { TradingAreaMemberInqModule } from '../../grop/menu/tradingAreaMemberInq/tradingAreaMemberInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "TradingAreaMemberInq", name: "TradingAreaMemberInq", text: "TradingAreaMemberInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */