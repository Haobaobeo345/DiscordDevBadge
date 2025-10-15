# Discord Developer Badge Bot

A simple Discord bot that helps you get the Discord Developer Badge.

## How to Get the Discord Developer Badge

### Step 1: Set Up Your Discord Bot
1. Go to https://discord.com/developers/applications
2. Click "New Application" and give it a name
3. Go to the "Bot" section → Click "Reset Token" to get your bot token
4. Copy the token (you'll need it later)

### Step 2: Invite Bot to Your Server
1. Go to "OAuth2" → "URL Generator"
2. Select scopes: `bot` and `applications.commands`
3. Select permissions: `Send Messages`
4. Copy the generated URL and open it in your browser
5. Invite the bot to your Discord server

### Step 3: Enable Community in Your Server
1. Go to your Discord server settings
2. Enable "Community" features (required for slash commands)

### Step 4: Run the Bot
1. Run this project
2. Answer "y" when asked if you opened community
3. Paste your bot token when asked
4. Wait for "Finished!" message

### Step 5: Use the Command
1. In your Discord server, type `/activedevbadge`
2. Click the link the bot sends you
3. Follow Discord's instructions to claim your Developer Badge

## Important Notes
- Only the bot owner can use the `/activedevbadge` command
- The message is private (only you can see it)
- You need to keep the bot running for the command to work
