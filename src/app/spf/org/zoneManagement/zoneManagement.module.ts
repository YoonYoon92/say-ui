declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZoneManagementComponent } from './zoneManagement.component';

@NgModule({
	declarations: [
		ZoneManagementComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class ZoneManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { ZoneManagementComponent } from '../../grop/menu/zoneManagement/zoneManagement.component';
 * { id : 'ZoneManagement',        component : ZoneManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { ZoneManagementModule } from '../../grop/menu/zoneManagement/zoneManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "ZoneManagement", name: "ZoneManagement", text: "ZoneManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */