import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountModule } from './account/account.module';
import { IndexModule } from './index/index.module';

const routes: Routes = [
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'account', loadChildren: ()=> AccountModule },
  { path: 'index', loadChildren: ()=>IndexModule },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }