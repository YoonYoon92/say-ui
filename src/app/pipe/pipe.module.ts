import { NgModule } from '@angular/core';

import { commaPipeComponent } from './comma.pipe.component';

@NgModule({
	declarations: [
		commaPipeComponent
	],
	exports: [
		commaPipeComponent
	],
	providers: [
	]
})

export class PipeModule { }