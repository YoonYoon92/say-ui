declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClsManagementComponent } from './clsManagement.component';
import { SearchConerComponent } from 'src/app/component/searchConer/searchConer.component';
import { SearchConerModule } from 'src/app/component/searchConer/searchConer.module';



@NgModule({
	declarations: [
		ClsManagementComponent,
		
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule,
		SearchConerModule
	],
	// providers: [
	// 	SearchConerComponent
	// ],
	//schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ClsManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { ClsManagementComponent } from '../../grop/menu/clsManagement/clsManagement.component';
 * { id : 'ClsManagement',        component : ClsManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { ClsManagementModule } from '../../grop/menu/clsManagement/clsManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "ClsManagement", name: "ClsManagement", text: "ClsManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */