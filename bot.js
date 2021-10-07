const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix,token} = require('./config.json');
client.login(token);
console.log("Startup success")
let author = "DungeonBot"

client.on('ready', () => {
    client.user.setActivity(`/roll`, { type: 'LISTENING' })
  })

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    else if (message.content.startsWith(prefix+'help')){
        const dieEmbed = new Discord.MessageEmbed()
        .setAuthor(author)
        .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fc2%2Fa0%2F9c%2Fc2a09c219d57538aed2ebb76c6ca2c3e.png&f=1&nofb=1')
        .setFooter('Author - Bread')
        .setColor('#9F0707')
        .setTimestamp()
        .addFields(
            { name: 'Command', value: "/roll [numberofDie]d[sideDie]+[modifier] [optional string] \n(intimidation, persuasion, etc.)"},
            { name: 'Example:', value: "/roll 1d6+8 intimidation"},
        )
        message.channel.send(dieEmbed).catch(err => console.log(err));
    }
    else if (message.content.includes('+')){
        const arg = await message.content.slice(prefix.length).trim().split(' ');
        const roll = arg[1];
        console.log(arg);
        const rollSet = roll.split('+');
        console.log(await "Rollset: ",rollSet);
        const die = rollSet[0]
        const modifier = parseInt(rollSet[1])
        let results = await rollFunction(rollSet,modifier).catch(err => console.log(err));;
        console.log(await "Results: ", results)
        console.log(arg[2])
        if (arg[2] != undefined){
            author = arg[2]
        }
        const dieEmbed = new Discord.MessageEmbed()
        .setAuthor(author.charAt(0).toUpperCase()+author.slice(1)+" Roll!")
        .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fc2%2Fa0%2F9c%2Fc2a09c219d57538aed2ebb76c6ca2c3e.png&f=1&nofb=1')
        .setFooter('Author - Bread')
        .setColor('#9F0707')
        .setTimestamp()
        .addFields(
            { name: 'Rolled:', value: results[0], inline: true },
            { name: 'Roll Modifier:', value: results[2], inline: true },
            { name: 'Total:', value: results[1], inline: true },

        )
    message.channel.send(dieEmbed).catch(err => console.log(err));
    author = "DungeonBot"
    }
    
    else if (message.content.startsWith(prefix+"roll")){
        const arg = await message.content.slice(prefix.length).trim().split(' ');
        console.log(arg);
        //console.log(await "Arg: ", arg)
        let results = await rollFunction(arg)
        console.log(await results)
        console.log(arg[2])
        if (arg[2] != undefined){
            author = arg[2]
        }
        const dieEmbed = new Discord.MessageEmbed()
            .setAuthor(author.charAt(0).toUpperCase()+author.slice(1)+" Roll!")
            .setFooter('Author - Bread')
            .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fc2%2Fa0%2F9c%2Fc2a09c219d57538aed2ebb76c6ca2c3e.png&f=1&nofb=1')
            .setColor('#9F0707')
            .setTimestamp()
            .addFields(
                { name: 'Roll Results:', value: results[0], inline: true },
                { name: 'Total:', value: results[1], inline: true },

            )
        message.channel.send(dieEmbed).catch(err => console.log(err));
        author = "DungeonBot"
    }
    

})

rollFunction = async (input, modifier = 0) =>{
    //console.log("input: ",input,"\n","modifier: ",modifier);
    const dieSet = await input

    if (modifier === 0){
        //console.log("DieSet in function: ",dieSet);
        die = await dieSet[1].split('d')
        //console.log("die in function: ",await die);
    }
    else{
        //console.log("DieSet in function: ",dieSet);
        die = await dieSet[0].split('d')
        //console.log("die in function: ",await die);
    }
    const dieCount = await die[0]
    const sideDie = await die[1]
    let roll = []
    let rollTotal = 0
    //console.log("Rollfunction parameters:","\n","dieSet: ",dieSet,"die: ",die,"dieCount: ",dieCount,"sideDie: ",sideDie,"modifier: ",rollTotal);
    for (let i = 0; i < dieCount; i++ ){
        let rollResult = (await Math.random() * sideDie)
        roll[i] = (await Math.round(rollResult))
    }
    console.log(await "Roll: ",roll);
    rollLength = (await roll.length);

    for (let i = 0; i < rollLength; i++){
        rollTotal += roll[i]
    }
    rollTotalwithMod = rollTotal + modifier
    console.log(await modifier);
    console.log(await "RollTotal: ",rollTotalwithMod)
    return await [roll,rollTotalwithMod,modifier];
}

//https://discord.com/oauth2/authorize?client_id=872361172815466507&scope=bot+applications.commands
