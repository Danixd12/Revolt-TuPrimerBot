import { Message } from "revolt.js/dist/maps/Messages";
import { Command } from "../modules/command";

module.exports = {
    name: 'ping', // nombre
    aliases: ['p'], // alias
    description: '¡Primer comando!', // descripcion
    developer: false, // developer ?
    run: async (msg: Message, args: string[]) => {

        let eleccion:any = args.join(' '); // args (argumentos), en este caso cogera todos nuestros argumentos y los separara por un espacio

        if (eleccion === "hola mundo") { // si el contenido del argumento es igual a "hola mundo"

            msg.channel!.sendMessage(`Pong!, ${eleccion}`) // enviamos mensaje al canal

        } else { // si no es igual

            msg.channel!.sendMessage(`No pong :(`)

        }

        

    } 
}