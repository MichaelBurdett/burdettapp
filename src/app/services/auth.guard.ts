import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(
        private auth: Auth,
        private router: Router
    ) {}

    canActivate(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            onAuthStateChanged(this.auth, async (user) => {
                if (user) {
                    resolve(true);
                } else {
                    console.log('User redirected to login');
                    this.router.navigateByUrl('/login', { replaceUrl: true });
                    reject(false);
                }
            });
        });
    }
}
