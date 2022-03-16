declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProgListManagementComponent } from './userProgListManagement.component';

@NgModule({
	declarations: [
		UserProgListManagementComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class UserProgListManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { UserProgListManagementComponent } from '../../grop/menu/userProgListManagement/userProgListManagement.component';
 * { id : 'UserProgListManagement',        component : UserProgListManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { UserProgListManagementModule } from '../../grop/menu/userProgListManagement/userProgListManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "UserProgListManagement", name: "UserProgListManagement", text: "UserProgListManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */