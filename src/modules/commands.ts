import fs from 'fs';

// NO TOCAR A MENOS QUE SEPAS QUE HACES
//esto carga los archivos

const commandsFiles = fs.readdirSync("./src/commands"); 
let commandsLoad = [];
for (const file of commandsFiles) {
    if (!file.endsWith(".js") && !file.endsWith(".ts") || file.endsWith(".d.ts")) continue;
    const fileName = file.split(".");
    try {
        commandsLoad.push(require(`../commands/${fileName[0]}.ts`))
        console.log(`[commands] Loaded command file ${file}!`)
    } catch (error) {
        commandsLoad.push(require(`../commands/${fileName[0]}.js`))
        console.log(`[commands] Loaded command file ${file}!`)
    }
}

export const commands = commandsLoad;