import { Subject } from 'rxjs/Subject'
import { User } from './user.model';
import { AuthDAta } from './auth-data.model';

export class AuthService {

    // Subject (ts -> ts) is like an EventEmitter (ts -> html)
    public AuthChange = new Subject<boolean>()
    private user: User

    registerUser(authData: AuthDAta) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        // .next is like the .emit of the eventEmitter
        this.AuthChange.next(true)
    }

    login(authData: AuthDAta) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
    }

    logout() {
        this.user = null
        this.AuthChange.next(false)
    }

    getUser() {
        return { ...this.user }
    }

    isAuth() {
        return this.user !== null
    }
}