declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConerLinkManagementComponent } from './conerLinkManagement.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		ConerLinkManagementComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule,
       AngularEditorModule,
       HttpClientModule
	],
	providers: [
	]
})

export class ConerLinkManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { ConerLinkManagementComponent } from '../../grop/menu/conerLinkManagement/conerLinkManagement.component';
 * { id : 'ConerLinkManagement',        component : ConerLinkManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { ConerLinkManagementModule } from '../../grop/menu/conerLinkManagement/conerLinkManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "ConerLinkManagement", name: "ConerLinkManagement", text: "ConerLinkManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */