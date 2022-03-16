declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PcManagementComponent } from './pcManagement.component';

@NgModule({
	declarations: [
		PcManagementComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class PcManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { PcManagementComponent } from '../../grop/menu/pcManagement/pcManagement.component';
 * { id : 'PcManagement',        component : PcManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { PcManagementModule } from '../../grop/menu/pcManagement/pcManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "PcManagement", name: "PcManagement", text: "PcManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */