declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmptyComponent } from './empty.component';

@NgModule({
	declarations: [
		EmptyComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class EmptyModule { }
/**
 * @copy to "tab-components.ts"
 */
//import { EmptyComponent } from '../../grop/menu/empty/empty.component';
//{ id : 'Empty',        component : EmptyComponent},

/**
 * @copy to "tab-modules.ts"
 */
//import { EmptyModule } from '../../grop/menu/empty/empty.module';

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 */
// {
// id: "Empty", name: "Empty", text: "Empty", iconCls: "x-fa fa-home", leaf: true
// },
