/*
* Perms will define what access a user is allowed. 
* These perms are granted based on the Roles one is assigned in the Discord
* and defined in the database from BOKBot.
*/

import { config } from "../config/config";

export interface IPerms{
    officer: string;
    raidLead: string;
    user: string;
}

export const perms: IPerms = {
    officer: config.roles.officer,
    raidLead: config.roles.raidLead,
    user: config.roles.user
}