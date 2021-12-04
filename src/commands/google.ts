import { Message } from "revolt.js/dist/maps/Messages";
import { Command } from "../types/command";

module.exports = {
    name: 'google',
    aliases: ['g'],
    description: 'Busqueda en google.',
    developer: false,
    run: async (msg: Message, args: string[]) => {
        let busqueda = args.join("%20");

        if (!busqueda) {
            msg.channel!.sendMessage("Necesitas especificar un contenido.")
        } 
        else {
            msg.channel!.sendMessage(`### Search Result: [link](https://www.google.es/search?q=${busqueda})`)
        }
    } 
}