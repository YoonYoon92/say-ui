declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { IndexTabzComponent } from './index-tabz.component';
import { IndexDashboardComponent } from './index-dashboard.component';

@NgModule({
	declarations: [
		IndexComponent,
		IndexTabzComponent,
		IndexDashboardComponent
	],
	imports: [
		CommonModule,
		IndexRoutingModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class IndexModule { }