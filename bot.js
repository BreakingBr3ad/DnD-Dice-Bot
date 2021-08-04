const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix,token} = require('./config.json');
client.login(token);
console.log("Startup success")


client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    else if (message.content.includes('+')){
        const arg = await message.content.slice(prefix.length).trim().split(' ');
        const roll = arg[1];
        const rollSet = roll.split('+');
        console.log(await "Rollset: ",rollSet);
        const die = rollSet[0]
        const modifier = parseInt(rollSet[1])
        let results = await rollFunction(rollSet,modifier).catch(err => console.log(err));;
        let flatResult = results.flat()
        console.log(await "Results: ", results)
        console.log(await "Flat results: ",flatResult)
        const dieEmbed = new Discord.MessageEmbed()
        .setAuthor('DungeonBot')
        .setThumbnail('https://i.pinimg.com/originals/22/3a/78/223a78d4be4fd606f3193428c32f3ceb.jpg')
        .setFooter('Author - Bread')
        .setColor('#9F0707')
        .addFields(
            { name: 'Rolled:', value: results[0], inline: true },
            { name: 'Roll Modifier:', value: results[2], inline: true },
            { name: 'Total:', value: results[1], inline: true },

        )
    message.channel.send(dieEmbed).catch(err => console.log(err));
    }
    
    else if (message.content.startsWith(prefix+"roll")){
        const arg = await message.content.slice(prefix.length).trim().split(' ');
        //console.log(await "Arg: ", arg)
        let results = await rollFunction(arg)
        console.log(await results)
        
        const dieEmbed = new Discord.MessageEmbed()
            .setAuthor('DungeonBot')
            .setFooter('Author - Bread')
            .setThumbnail('https://i.pinimg.com/originals/22/3a/78/223a78d4be4fd606f3193428c32f3ceb.jpg')
            .setColor('#9F0707')
            .addFields(
                { name: 'Roll Results:', value: results[0], inline: true },
                { name: 'Total:', value: results[1], inline: true },

            )
        message.channel.send(dieEmbed).catch(err => console.log(err));
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