declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JumManagementComponent } from './jumManagement.component';

@NgModule({
	declarations: [
		JumManagementComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class JumManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { JumManagementComponent } from '../../grop/menu/jumManagement/jumManagement.component';
 * { id : 'JumManagement',        component : JumManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { JumManagementModule } from '../../grop/menu/jumManagement/jumManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "JumManagement", name: "JumManagement", text: "JumManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */