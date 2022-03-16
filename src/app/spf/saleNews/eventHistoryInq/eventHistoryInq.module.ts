declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventHistoryInqComponent } from './eventHistoryInq.component';

@NgModule({
	declarations: [
		EventHistoryInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class EventHistoryInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { EventHistoryInqComponent } from '../../grop/menu/eventHistoryInq/eventHistoryInq.component';
 * { id : 'EventHistoryInq',        component : EventHistoryInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { EventHistoryInqModule } from '../../grop/menu/eventHistoryInq/eventHistoryInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "EventHistoryInq", name: "EventHistoryInq", text: "EventHistoryInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */