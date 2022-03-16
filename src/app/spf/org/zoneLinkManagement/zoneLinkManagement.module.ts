declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZoneLinkManagementComponent } from './zoneLinkManagement.component';

@NgModule({
	declarations: [
		ZoneLinkManagementComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class ZoneLinkManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { ZoneLinkManagementComponent } from '../../grop/menu/zoneLinkManagement/zoneLinkManagement.component';
 * { id : 'ZoneLinkManagement',        component : ZoneLinkManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { ZoneLinkManagementModule } from '../../grop/menu/zoneLinkManagement/zoneLinkManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "ZoneLinkManagement", name: "ZoneLinkManagement", text: "ZoneLinkManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */