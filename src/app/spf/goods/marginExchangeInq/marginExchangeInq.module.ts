declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarginExchangeInqComponent } from './marginExchangeInq.component';

@NgModule({
	declarations: [
		MarginExchangeInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class MarginExchangeInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { MarginExchangeInqComponent } from '../../grop/menu/marginExchangeInq/marginExchangeInq.component';
 * { id : 'MarginExchangeInq',        component : MarginExchangeInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { MarginExchangeInqModule } from '../../grop/menu/marginExchangeInq/marginExchangeInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "MarginExchangeInq", name: "MarginExchangeInq", text: "MarginExchangeInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */