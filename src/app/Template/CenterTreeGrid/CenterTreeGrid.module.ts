declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CenterTreeGridRoutingModule } from './CenterTreeGrid-routing.module';
import { CenterTreeGridComponent } from './CenterTreeGrid.component';

@NgModule({
	declarations: [
		CenterTreeGridComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		CenterTreeGridRoutingModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class CenterTreeGridModule { }