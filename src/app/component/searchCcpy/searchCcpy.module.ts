declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchCcpyComponent } from './searchCcpy.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
	declarations: [
		SearchCcpyComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	],
	exports:[
		SearchCcpyComponent
	],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class SearchCcpyModule { }

/**
 * @copy to "*.module.ts"
 * import { SearchCcpyComponent } from '../../../component/searchCcpy/searchCcpy.component';
 *
 *
 * @NgModule
 *   declarations: 에 SearchCcpyComponent  추가
 * 
 * 
 * @ 사용할 HTML 
 * <app-searchCcpy 
 *     [isDialogShowing]="this.isDialogShowing"
 *     [searchCcpyParamModel]="this.searchCcpyParamModel"  
 *     (sendObject)="itemSelected($event)"
 * >
 * </app-searchCcpy>
 * 
 *	
 **/



