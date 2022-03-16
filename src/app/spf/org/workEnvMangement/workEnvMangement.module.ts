declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkEnvMangementComponent } from './workEnvMangement.component';

@NgModule({
	declarations: [
		WorkEnvMangementComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class WorkEnvMangementModule { }

/**
 * @copy to "tab-components.ts"
 * import { WorkEnvMangementComponent } from '../../grop/menu/workEnvMangement/workEnvMangement.component';
 * { id : 'WorkEnvMangement',        component : WorkEnvMangementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { WorkEnvMangementModule } from '../../grop/menu/workEnvMangement/workEnvMangement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "WorkEnvMangement", name: "WorkEnvMangement", text: "WorkEnvMangement", iconCls: "x-fa fa-home", leaf: true
 * }
 */