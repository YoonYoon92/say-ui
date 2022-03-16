declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CloseBefZoneSalePrintComponent } from './closeBefZoneSalePrint.component';

@NgModule({
	declarations: [
		CloseBefZoneSalePrintComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class CloseBefZoneSalePrintModule { }

/**
 * @copy to "tab-components.ts"
 * import { CloseBefZoneSalePrintComponent } from '../../grop/menu/CloseBefZoneSalePrint/CloseBefZoneSalePrint.component';
 * { id : 'CloseBefZoneSalePrint',        component : CloseBefZoneSalePrintComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { CloseBefZoneSalePrintModule } from '../../grop/menu/CloseBefZoneSalePrint/CloseBefZoneSalePrint.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "CloseBefZoneSalePrint", name: "CloseBefZoneSalePrint", text: "CloseBefZoneSalePrint", iconCls: "x-fa fa-home", leaf: true
 * }
 */