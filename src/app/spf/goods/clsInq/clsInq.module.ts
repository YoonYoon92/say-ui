declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClsInqComponent } from './clsInq.component';
import { SearchCcpyComponent } from '../../../component/searchCcpy/searchCcpy.component';
import { SearchConerComponent } from '../../../component/searchConer/searchConer.component';
import { SearchCcpyModule } from 'src/app/component/searchCcpy/searchCcpy.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
	declarations: [
		ClsInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule,
		SearchCcpyModule
	],
	 providers: [
	 ]
	//schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ClsInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { ClsInqComponent } from '../../grop/menu/clsInq/clsInq.component';
 * { id : 'ClsInq',        component : ClsInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { ClsInqModule } from '../../grop/menu/clsInq/clsInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "ClsInq", name: "ClsInq", text: "ClsInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */