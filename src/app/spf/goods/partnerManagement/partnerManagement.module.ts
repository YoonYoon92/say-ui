declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartnerManagementComponent } from './partnerManagement.component';

@NgModule({
	declarations: [
		PartnerManagementComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class PartnerManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { PartnerManagementComponent } from '../../grop/menu/partnerManagement/partnerManagement.component';
 * { id : 'PartnerManagement',        component : PartnerManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { PartnerManagementModule } from '../../grop/menu/partnerManagement/partnerManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "PartnerManagement", name: "PartnerManagement", text: "PartnerManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */