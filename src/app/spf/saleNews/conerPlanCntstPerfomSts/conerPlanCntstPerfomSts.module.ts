declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConerPlanCntstPerfomStsComponent } from './conerPlanCntstPerfomSts.component';

@NgModule({
	declarations: [
		ConerPlanCntstPerfomStsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class ConerPlanCntstPerfomStsModule { }

/**
 * @copy to "tab-components.ts"
 * import { ConerPlanCntstPerfomStsComponent } from '../../grop/menu/conerPlanCntstPerfomSts/conerPlanCntstPerfomSts.component';
 * { id : 'ConerPlanCntstPerfomSts',        component : ConerPlanCntstPerfomStsComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { ConerPlanCntstPerfomStsModule } from '../../grop/menu/conerPlanCntstPerfomSts/conerPlanCntstPerfomSts.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "ConerPlanCntstPerfomSts", name: "ConerPlanCntstPerfomSts", text: "ConerPlanCntstPerfomSts", iconCls: "x-fa fa-home", leaf: true
 * }
 */