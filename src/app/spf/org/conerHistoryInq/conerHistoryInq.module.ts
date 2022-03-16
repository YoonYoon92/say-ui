declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConerHistoryInqComponent } from './conerHistoryInq.component';

@NgModule({
	declarations: [
		ConerHistoryInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class ConerHistoryInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { ConerHistoryInqComponent } from '../../grop/menu/conerHistoryInq/conerHistoryInq.component';
 * { id : 'ConerHistoryInq',        component : ConerHistoryInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { ConerHistoryInqModule } from '../../grop/menu/conerHistoryInq/conerHistoryInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "ConerHistoryInq", name: "ConerHistoryInq", text: "ConerHistoryInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */