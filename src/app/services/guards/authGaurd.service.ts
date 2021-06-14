import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
 
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
    constructor(private _router:Router) {
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        const level = localStorage.getItem('code_level');
        const token = localStorage.getItem('gop_app_token');
        console.log(level);
 
        if (!token)  {
            this._router.navigateByUrl('/login');
            return false;
        } 

        let roles = route.data.roles as Array<string>;
        if(roles != undefined){
            for(var i = 0; i < roles.length; i++){
                if(level != roles[i]){
                    this._router.navigateByUrl('/login');
                    return false;
                }
            }
        }
        return true;
    }
 
}