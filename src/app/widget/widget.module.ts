import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsComponent } from './alerts/alerts.component';

import { AlertInfoComponent } from './alerts/info/alert.info.component';
import { AlertPrimaryComponent } from './alerts/primary/alert.primary.component';
import { AlertSuccessComponent } from './alerts/success/alert.success.component';
import { AlertWarningComponent } from './alerts/warning/alert.warning.component';

// import { PaginationComponent } from './pagination/pagination.component';
import { ChartJsLineComponent } from './chartJs/line/chartJs.line.component';
import { ChartJsPieComponent } from './chartJs/doughnut/chartJs.doughnut.component';
import { FullCalendarComponent } from './calendar/full.calendar.component';

//import { AlertHmsTestAlertsComponent } from './alerts/hmsTestAlerts/alert.hmsTestAlerts.component';


@NgModule({
	declarations: [
		AlertsComponent,
		AlertInfoComponent,
		AlertPrimaryComponent,
		AlertSuccessComponent,
		AlertWarningComponent,
		ChartJsLineComponent,
		ChartJsPieComponent,
		FullCalendarComponent,
		//AlertHmsTestAlertsComponent
		// PaginationComponent
	],
	imports: [
		CommonModule,
		ExtAngularModernModule
	],
	exports: [
		AlertsComponent,
		AlertInfoComponent,
		AlertPrimaryComponent,
		AlertSuccessComponent,
		AlertWarningComponent,
		ChartJsLineComponent,
		ChartJsPieComponent,
		FullCalendarComponent,
		//AlertHmsTestAlertsComponent
		// PaginationComponent
	],
	providers: [
	],
})

export class WidgetModule { }