declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchConerComponent } from './searchConer.component';

@NgModule({
	declarations: [
		SearchConerComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	],
	exports:[SearchConerComponent]
	,
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class SearchConerModule { }

/**
 * @copy to "*.module.ts"
 * import { SearchCcpyComponent } from '../../../component/searchCcpy/SearchConerComponent.component';
 *
 *
 * @NgModule
 *   declarations: 에 SearchConerComponent  추가
 * 
 * 
 * @ 사용할 HTML 
 * <app-searchCcpy 
 *     [isDialogShowing]="this.isDialogShowing"
 *     [SearchConerParamModel]="this.SearchConerParamModel"  
 *     (sendObject)="itemSelected($event)"
 * >
 * </app-searchCcpy>
 * 
 *	
 **/



