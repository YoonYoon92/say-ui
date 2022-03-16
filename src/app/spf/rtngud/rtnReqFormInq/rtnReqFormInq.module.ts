declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RtnReqFormInqComponent } from './rtnReqFormInq.component';

@NgModule({
	declarations: [
		RtnReqFormInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class RtnReqFormInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { RtnReqFormInqComponent } from '../../grop/menu/rtnReqFormInq/rtnReqFormInq.component';
 * { id : 'RtnReqFormInq',        component : RtnReqFormInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { RtnReqFormInqModule } from '../../grop/menu/rtnReqFormInq/rtnReqFormInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "RtnReqFormInq", name: "RtnReqFormInq", text: "RtnReqFormInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */