import { Request, Response } from "express";
import { User } from "./types/user";
import { Message } from "./types/message"
import { mockMessages } from "./assets/mockMessages";
import { mockUserDetails } from "./assets/mockUserDetails";

function getuser(Id: string){
    for (let user of mockUserDetails) {
        if (user.id === +Id) return user;
    }
}


export {
    getuser,
}