declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PwdChgComponent } from './pwdChg.component';

@NgModule({
	declarations: [
		PwdChgComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class PwdChgModule { }

/**
 * @copy to "tab-components.ts"
 * import { PwdChgComponent } from '../../grop/menu/pwdChg/pwdChg.component';
 * { id : 'PwdChg',        component : PwdChgComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { PwdChgModule } from '../../grop/menu/pwdChg/pwdChg.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "PwdChg", name: "PwdChg", text: "PwdChg", iconCls: "x-fa fa-home", leaf: true
 * }
 */