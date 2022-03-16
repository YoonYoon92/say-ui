declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentRoutingComponent } from './content-routing.component';

@NgModule({
    imports: [
        CommonModule,
        ContentRoutingModule,
		ExtAngularModernModule
    ],
    declarations: [ContentRoutingComponent]
})
export class ContentModule { }