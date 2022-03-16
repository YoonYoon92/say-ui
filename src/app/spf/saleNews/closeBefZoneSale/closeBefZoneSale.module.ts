declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CloseBefZoneSaleComponent } from './closeBefZoneSale.component';

@NgModule({
	declarations: [
		CloseBefZoneSaleComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class CloseBefZoneSaleModule { }

/**
 * @copy to "tab-components.ts"
 * import { CloseBefZoneSaleComponent } from '../../grop/menu/closeBefZoneSale/closeBefZoneSale.component';
 * { id : 'CloseBefZoneSale',        component : CloseBefZoneSaleComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { CloseBefZoneSaleModule } from '../../grop/menu/closeBefZoneSale/closeBefZoneSale.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "CloseBefZoneSale", name: "CloseBefZoneSale", text: "CloseBefZoneSale", iconCls: "x-fa fa-home", leaf: true
 * }
 */