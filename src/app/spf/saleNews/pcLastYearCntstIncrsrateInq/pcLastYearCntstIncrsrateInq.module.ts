declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PcLastYearCntstIncrsrateInqComponent } from './pcLastYearCntstIncrsrateInq.component';

@NgModule({
	declarations: [
		PcLastYearCntstIncrsrateInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class PcLastYearCntstIncrsrateInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { PcLastYearCntstIncrsrateInqComponent } from '../../grop/menu/PcLastYearCntstIncrsrateInq/PcLastYearCntstIncrsrateInq.component';
 * { id : 'PcLastYearCntstIncrsrateInq',        component : PcLastYearCntstIncrsrateInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { PcLastYearCntstIncrsrateInqModule } from '../../grop/menu/PcLastYearCntstIncrsrateInq/PcLastYearCntstIncrsrateInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "PcLastYearCntstIncrsrateInq", name: "PcLastYearCntstIncrsrateInq", text: "PcLastYearCntstIncrsrateInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */