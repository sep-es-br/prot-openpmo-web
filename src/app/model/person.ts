import { Actor } from "./actor";

export class Person extends Actor {
    userName: String = "";
    password: String = null;
    resetPassword: Boolean = false;
    email: String = "";
    authentication: String = "";
}
