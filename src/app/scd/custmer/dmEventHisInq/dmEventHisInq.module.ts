declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DmEventHisInqComponent } from './dmEventHisInq.component';

@NgModule({
	declarations: [
		DmEventHisInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class DmEventHisInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { DmEventHisInqComponent } from '../../scd/custmer/dmEventHisInq/dmEventHisInq.component';
 * { id : 'DmEventHisInq',        component : DmEventHisInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { DmEventHisInqModule } from '../../scd/custmer/dmEventHisInq/dmEventHisInq.module';
 */

/**
 * @copy to "env.service.ts" (개발 & 테스트때만)
 * {
 * 	id: "DmEventHisInq", name: "DmEventHisInq", text: "DM행사내역 조회", iconCls: "x-fa fa-home", leaf: true
 * }
 */