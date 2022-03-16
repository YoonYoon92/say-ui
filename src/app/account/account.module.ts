declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';

const routes: Routes = [
    { path: '', component: AccountComponent }
];

@NgModule({
	declarations: [
		AccountComponent
	],
	imports: [
		CommonModule,
		ExtAngularModernModule,
		RouterModule.forChild(routes)
	],
	exports: [RouterModule],
	providers: [
	]
})

export class AccountModule { }