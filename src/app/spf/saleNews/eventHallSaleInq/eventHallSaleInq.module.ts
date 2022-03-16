declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventHallSaleInqComponent } from './eventHallSaleInq.component';

@NgModule({
	declarations: [
		EventHallSaleInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class EventHallSaleInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { EventHallSaleInqComponent } from '../../grop/menu/eventHallSaleInq/eventHallSaleInq.component';
 * { id : 'EventHallSaleInq',        component : EventHallSaleInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { EventHallSaleInqModule } from '../../grop/menu/eventHallSaleInq/eventHallSaleInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "EventHallSaleInq", name: "EventHallSaleInq", text: "EventHallSaleInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */