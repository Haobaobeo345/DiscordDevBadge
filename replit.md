# Discord Developer Badge Bot

## Overview

A Discord bot application built with Node.js and Discord.js v14 that helps users obtain the Discord Developer Badge. The bot provides a simple slash command (`/active`) to guide users through the badge acquisition process. The application uses an interactive command-line setup process to configure the bot token and verify server prerequisites before deployment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Application Structure

**Single-file Architecture**: The entire bot logic is contained in `index.js`, implementing a straightforward command-line driven setup followed by Discord bot initialization. This minimalist approach is suitable for the bot's single-command functionality.

**Interactive Setup Flow**: 
- Uses Node.js `readline` interface to collect configuration interactively
- Validates server community status before bot initialization
- Prompts for bot token at runtime (no environment variable usage currently)
- Implements input validation for setup questions

### Discord Integration

**Discord.js v14 Framework**: 
- Uses modern Discord.js library with minimal gateway intents (`GatewayIntentBits.Guilds`)
- Implements slash commands using `SlashCommandBuilder` 
- Uses Discord REST API for command registration

**Slash Command Architecture**:
- Single command: `/active` - provides Discord Developer Badge information
- Commands are registered dynamically when bot becomes ready
- Uses Discord's application commands system (requires `applications.commands` OAuth2 scope)

**Bot Permissions Model**:
- Minimal required permissions: Send Messages, Use Slash Commands
- Guild-only intents to reduce overhead
- No message content intent needed (slash commands only)

### Error Handling & Validation

**Input Validation**: Validates user responses during setup (y/n answers, non-empty token)

**Prerequisites Checking**: Ensures Discord server community features are enabled before proceeding (required for slash commands in some server configurations)

## External Dependencies

### Core Dependencies

**discord.js (^14.23.2)**: Primary Discord API wrapper library providing:
- Discord client functionality
- Gateway intents management  
- REST API interactions
- Slash command builders and handlers
- Event handling system

### Runtime Dependencies

**Node.js Built-ins**:
- `readline`: Command-line interface for interactive setup
- Native Promise support for async/await pattern

### Discord Platform Requirements

**Discord Developer Portal**: Bot must be created and configured at https://discord.com/developers/applications

**Required OAuth2 Scopes**: `applications.commands` for slash command functionality

**Server Prerequisites**: Community features must be enabled on the Discord server for proper slash command operation