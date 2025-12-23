import { Routes } from '@angular/router';
import { LoginComponent } from './shared/component/login/login.component';
import { InternListComponent } from './component/intern-list/intern-list.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'intern-list', component:InternListComponent},
    {path:'', redirectTo:'login', pathMatch:'full' }
];
