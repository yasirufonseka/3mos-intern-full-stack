import { Routes } from '@angular/router';
import { LoginComponent } from './shared/component/login/login.component';
import { InternListComponent } from './component/intern-list/intern-list.component';
import { ProfileComponent } from './shared/component/profile/profile.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'intern-list', component:InternListComponent,canActivate:[authGuard]},
    {path:'profile', component:ProfileComponent,canActivate:[authGuard]},
    {path:'**', redirectTo:'login', pathMatch:'full' }
];
