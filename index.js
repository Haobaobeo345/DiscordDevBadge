const readline = require('readline');
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  try {
    const answer = await question('Did you open community in discord server y/n? ');
    
    if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'n') {
      console.log('Please answer y or n');
      rl.close();
      process.exit(1);
    }
    
    if (answer.toLowerCase() === 'n') {
      console.log('Please open community in your Discord server first, then run the bot again.');
      rl.close();
      process.exit(1);
    }
    
    const token = await question('Enter your bot token: ');
    
    if (!token || token.trim() === '') {
      console.log('Error: Bot token cannot be empty');
      rl.close();
      process.exit(1);
    }
    
    rl.close();
    console.log('Setting up bot...');
    
    const client = new Client({
      intents: [GatewayIntentBits.Guilds]
    });
    
    const commands = [
      new SlashCommandBuilder()
        .setName('active')
        .setDescription('Get the Discord Developer Badge link')
        .toJSON()
    ];
    
    client.once('ready', async () => {
      console.log(`Bot is online as ${client.user.tag}`);
      
      const rest = new REST({ version: '10' }).setToken(token.trim());
      
      try {
        console.log('Registering /active command...');
        await rest.put(
          Routes.applicationCommands(client.user.id),
          { body: commands }
        );
        console.log('Finished!');
      } catch (error) {
        console.log('Error:', error.message);
        process.exit(1);
      }
    });
    
    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      
      if (interaction.commandName === 'active') {
        await interaction.reply({
          content: '🎉 **Discord Developer Badge**\n\nUse this bot and get your Discord Developer Badge!\n\n🔗 **Get your badge here:** https://discord.com/developers/active-developer',
          ephemeral: false
        });
      }
    });
    
    await client.login(token.trim());
    
  } catch (error) {
    console.log('Error:', error.message);
    rl.close();
    process.exit(1);
  }
}

main();
