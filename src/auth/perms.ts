/*
* Perms will define what access a user is allowed. 
* These perms are granted based on the Roles one is assigned in the Discord
* and defined in the database from BOKBot.
*/

export interface IPerms{
    officer: string[];
    raidLead: string[];
    user: string[];
}

export const perms: IPerms = {
    officer: ['getRaids', 'updateRaids', 'createRaids', 'getAllReports', 'closeReport'],
    raidLead: ['getRaids', 'updateRaids', 'createRaids', 'callRaid'],
    user: ['getReport', 'createReport', 'replyReport']
}