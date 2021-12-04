import { Message } from "revolt.js/dist/maps/Messages";
import { Command } from "../types/command";

module.exports = {
    name: 'comando1', // nombre
    aliases: ['c1'], // alias
    description: 'Test', // descripcion
    developer: false, // developer ?
    run: async (msg: Message, args: string[]) => {
        // TU CODIGO
    } 
}