# Discord Developer Badge Bot

## Overview

A lightweight Discord bot designed to help users obtain the Discord Developer Badge. The bot provides an interactive command-line setup process and implements a single slash command (`/activedevbadge`) that delivers information about obtaining the developer badge. Built with Node.js and Discord.js v14, it follows a minimalist approach with a single-file architecture optimized for simplicity and ease of deployment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Application Design

**Single-File Architecture**  
The entire application resides in `index.js`, combining setup workflow and bot runtime logic. This monolithic approach was chosen deliberately to avoid unnecessary complexity for a bot with minimal functionality.

- **Rationale**: For a simple, single-command bot, separating concerns across multiple files would add overhead without meaningful benefits
- **Trade-offs**: While this limits scalability, it maximizes maintainability and reduces the learning curve for contributors

**Interactive Setup Flow**  
Uses Node.js built-in `readline` module for runtime configuration through CLI prompts:

- Validates Discord server community status (required prerequisite for slash commands)
- Collects bot token securely at runtime without persistent storage
- Implements strict input validation with graceful error handling
- Automatically closes readline interface after setup to prevent input conflicts

**Command System**  
- Single slash command implementation: `/activedevbadge`
- Commands registered dynamically when bot reaches ready state
- Uses Discord's native Application Commands API for modern slash command support

### Discord Integration

**Discord.js v14 Framework**  
Primary dependency for all Discord API interactions:

- Minimal gateway intents configuration (`GatewayIntentBits.Guilds` only)
- Modern slash command implementation via `SlashCommandBuilder`
- REST API integration for command registration
- No message content intent required (slash command-only design)

**Security & Permissions Model**  
- Minimal required permissions: Send Messages, Use Slash Commands
- Guild-only intents to minimize data exposure and comply with privacy best practices
- No persistent credential storage - token collected interactively at runtime
- Token validation handled automatically by Discord.js client initialization

## External Dependencies

**npm Packages**:
- `discord.js` (v14.23.2) - Core Discord API wrapper and bot framework

**Discord Platform Requirements**:
- Discord Bot Token (collected at runtime)
- Discord Server with Community features enabled (prerequisite for slash commands)
- Bot must be invited to server with appropriate permissions

**Runtime Environment**:
- Node.js (v16.11.0 or higher, as required by Discord.js v14)
- Standard input/output for interactive setup process