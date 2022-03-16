declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrgnztInqComponent } from './orgnztInq.component';

@NgModule({
	declarations: [
		OrgnztInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class OrgnztInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { OrgnztInqComponent } from '../../grop/menu/OrgnztInq/OrgnztInq.component';
 * { id : 'OrgnztInq',        component : OrgnztInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { OrgnztInqModule } from '../../grop/menu/OrgnztInq/OrgnztInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "OrgnztInq", name: "OrgnztInq", text: "OrgnztInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */