declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CenterGridRoutingModule } from './CenterGrid-routing.module';
import { CenterGridComponent } from './CenterGrid.component';

@NgModule({
	declarations: [
		CenterGridComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		CenterGridRoutingModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class CenterGridModule { }