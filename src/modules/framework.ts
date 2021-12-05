import { Client } from 'revolt.js';
import { Message } from 'revolt.js/dist/maps/Messages';
import { commands} from './commands';
import { Context, Command } from './command';

export class BotFramework {
    client: Client;
    developers: string[];
    prefix: string;
    commands = commands;


    constructor(client: Client, developers: string[], prefix: string) {
        this.client = client;
        this.developers = developers;
        this.prefix = prefix;

        this.client.on('connecting', async () => {
            console.info('Conectando...'); // evento conectando
        })
        this.client.on('connected', async () => {
            console.info('Conectado!'); // conectado
        })
  
        this.client.on('ready', async () => {

            console.info(`Iniciado como ${client.user!.username} (${client.user!._id})`) // evento ready!
        });

        this.client.on('message', async msg => {
    
            if (!msg.author || msg.author.bot) return

            const context = this.isValidContext(msg);
            if (!context.command || !context.canExecute) return


            try {
                context.command.run(msg, context.args)

            } catch (exc) {
                await msg.channel?.sendMessage(`Algo raro a ocurrido, reportalo a los desarrolladores: \n\`\`\`js\n${exc}\`\`\``)
            }
        });
    }



    isValidContext(msg: Message): Context {

        let values: Context = { command: null, args: [], canExecute: false };

        const prefixMention = new RegExp(`^<@!?${this.client.user!._id}>( |)$`);

        const botPinged = prefixMention.test(msg.content as string);
        if (botPinged) (
            msg.channel?.sendMessage(`Hey! My prefijo es \`${this.prefix}\` \n Framework by dani33y.`)
        );


        if (typeof msg.content !== "string") return values;

        if (!msg.content.startsWith(this.prefix)) return values;

        const args = msg.content.toString().substr(this.prefix.length).split(' ');
        const commandName = args.shift();
        const command: Command = this.getCommand(commandName as string);

        values.command = command;
        values.args = args;
        if (!command || command.developer && !this.developers.includes(msg.author_id)) return values;


        values.canExecute = true;
        return values;
    }

    getCommand(value: string) {
        return this.commands.find(cmd => cmd.name === value || cmd.aliases.includes(value))
    }

}