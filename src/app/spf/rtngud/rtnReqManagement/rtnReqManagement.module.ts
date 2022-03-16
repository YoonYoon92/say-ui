declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RtnReqManagementComponent } from './rtnReqManagement.component';
import { SearchClassModule } from 'src/app/component/searchClass/searchClass.module';
import { SearchCcpyModule } from 'src/app/component/searchCcpy/searchCcpy.module';

@NgModule({
	declarations: [
		RtnReqManagementComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule,
		SearchClassModule,
		SearchCcpyModule
	],
	providers: [
	]
})

export class RtnReqManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { RtnReqManagementComponent } from '../../grop/menu/rtnReqManagement/rtnReqManagement.component';
 * { id : 'RtnReqManagement',        component : RtnReqManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { RtnReqManagementModule } from '../../grop/menu/rtnReqManagement/rtnReqManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "RtnReqManagement", name: "RtnReqManagement", text: "RtnReqManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */