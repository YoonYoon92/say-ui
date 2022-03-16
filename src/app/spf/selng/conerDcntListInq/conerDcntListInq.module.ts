declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConerDcntListInqComponent } from './conerDcntListInq.component';

@NgModule({
	declarations: [
		ConerDcntListInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class ConerDcntListInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { ConerDcntListInqComponent } from '../../grop/menu/conerDcntListInq/conerDcntListInq.component';
 * { id : 'ConerDcntListInq',        component : ConerDcntListInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { ConerDcntListInqModule } from '../../grop/menu/conerDcntListInq/conerDcntListInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "ConerDcntListInq", name: "ConerDcntListInq", text: "ConerDcntListInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */