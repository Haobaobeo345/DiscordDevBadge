# Discord Developer Badge Bot

## Overview

A lightweight Discord bot designed to help users obtain the Discord Developer Badge. The bot provides an interactive command-line setup process and implements a single slash command (`/activedevbadge`) that provides users with the link to claim their developer badge. The application prioritizes simplicity with a single-file architecture, runtime-only configuration, and minimal permissions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Application Design

**Single-File Architecture**  
The entire application resides in `index.js`, combining setup workflow and bot runtime logic. This monolithic approach was chosen deliberately to minimize complexity for a bot with a single command.

- **Problem**: Need a simple bot without over-engineering
- **Solution**: All logic in one file - setup prompts, command registration, and bot runtime
- **Rationale**: For a single-command bot, separating concerns across multiple files adds overhead without meaningful benefits
- **Trade-offs**: Limits scalability but maximizes maintainability and reduces learning curve for contributors

**Interactive CLI Setup Flow**  
Uses Node.js built-in `readline` module for runtime configuration through terminal prompts:

- **Problem**: Need to configure bot without storing sensitive credentials
- **Solution**: Collect bot token and validate prerequisites at runtime via interactive prompts
- **Key Features**:
  - Validates Discord server community status (required for slash commands)
  - Collects bot token securely without persistent storage
  - Strict input validation with graceful error handling (y/n validation, empty token checks)
  - Automatically closes readline interface after setup to prevent input conflicts
- **Alternative Considered**: Environment variables (.env files) - rejected to avoid credential storage on disk
- **Pros**: No credential leakage, simple setup process
- **Cons**: Token must be entered each time bot runs

**Command System**  
- **Implementation**: Single slash command `/activedevbadge` 
- **Registration**: Commands registered dynamically when bot reaches ready state
- **Framework**: Uses Discord's native Application Commands API via SlashCommandBuilder
- **Scope**: Guild-only commands for immediate availability

### Discord Integration

**Discord.js v14 Framework**  
Primary dependency for all Discord API interactions:

- **Problem**: Need reliable Discord API integration
- **Solution**: Discord.js v14 - official JavaScript library for Discord Bot API
- **Configuration**:
  - Minimal gateway intents: `GatewayIntentBits.Guilds` only
  - Modern slash command implementation via `SlashCommandBuilder`
  - REST API integration for command registration
  - No message content intent required (slash command-only design)
- **Rationale**: Official library with active maintenance, comprehensive documentation, and strong typing support

**Security & Permissions Model**  
- **Required Permissions**: Minimal scope - Send Messages and Use Slash Commands only
- **Gateway Intents**: Guild-only to minimize data exposure and comply with privacy best practices
- **Credential Handling**: No persistent token storage - collected interactively at runtime
- **Validation**: Token validity checked automatically by Discord.js client initialization
- **Command Privacy**: Bot owner restriction for `/activedevbadge` command (implied by badge acquisition flow)

## External Dependencies

**Core Dependencies**
- **discord.js v14.23.2**: Official Discord API wrapper library
  - Provides Client class for bot connection
  - SlashCommandBuilder for command creation
  - REST client for API interactions
  - Routes helper for API endpoints
  - Gateway intents management

**Node.js Built-in Modules**
- **readline**: Interactive CLI input/output for setup prompts
- **process**: Standard input/output streams and process control

**Discord Platform Requirements**
- Discord Developer Portal access for bot creation and token generation
- Discord server with Community features enabled (prerequisite for slash commands)
- OAuth2 URL with bot and applications.commands scopes for bot invitation