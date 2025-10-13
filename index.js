const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ]
});

const commands = [
  new SlashCommandBuilder()
    .setName('active')
    .setDescription('Get the Discord Developer Badge link')
    .toJSON()
];

client.once('ready', async () => {
  console.log(`✅ Bot is online as ${client.user.tag}`);
  
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
  
  try {
    console.log('🔄 Registering slash commands...');
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log('✅ Slash commands registered successfully!');
  } catch (error) {
    console.error('❌ Error registering commands:', error);
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

const token = process.env.DISCORD_BOT_TOKEN;

if (!token) {
  console.error('❌ Error: DISCORD_BOT_TOKEN is not set in environment variables!');
  process.exit(1);
}

client.login(token).catch(error => {
  console.error('❌ Failed to login:', error);
  process.exit(1);
});
