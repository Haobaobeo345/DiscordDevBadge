# Discord Developer Badge Bot

## Overview

A lightweight Discord bot that helps users obtain the Discord Developer Badge. Built with Node.js and Discord.js v14, the bot provides an interactive command-line setup process and implements a single slash command to guide users through the badge acquisition process. The application uses a minimalist single-file architecture designed for simplicity and ease of deployment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Application Design

**Single-File Architecture**: The entire application logic resides in `index.js`, combining setup workflow and bot runtime in one cohesive unit. This approach eliminates unnecessary complexity for a single-command bot.

**Interactive Setup Flow**:
- Uses Node.js built-in `readline` module for command-line interaction
- Collects bot token at runtime through CLI prompts (no config files or environment variables)
- Validates Discord server community status before initialization (required for slash commands)
- Implements strict input validation with clear error messaging
- Gracefully exits on invalid inputs or missing prerequisites
- Closes readline interface after setup to prevent input conflicts

**Command System**:
- Single slash command: `/activedevbadge` - provides Discord Developer Badge information
- Commands registered dynamically when bot becomes ready
- Uses Discord's native application commands API

**Design Rationale**: The single-file approach was chosen for simplicity. For a bot with minimal functionality, separating concerns into multiple files would add unnecessary complexity. Slash commands provide better discoverability and user experience compared to traditional prefix commands.

### Discord Integration

**Discord.js v14 Framework**:
- Primary dependency for Discord API interaction
- Minimal gateway intents configuration (`GatewayIntentBits.Guilds` only)
- Modern slash command implementation using `SlashCommandBuilder`
- REST API integration for command registration

**Permission Model**:
- Minimal required permissions: Send Messages, Use Slash Commands
- Guild-only intents to minimize data exposure
- No message content intent needed (slash command-only bot)
- Security-first approach requesting only essential permissions

**Authentication**:
- Bot token collected interactively at runtime
- No persistent storage of credentials
- Token validation handled by Discord.js client initialization

## External Dependencies

### NPM Packages

**discord.js (v14.23.2)**:
- Core framework for Discord bot functionality
- Provides Client, REST API, Gateway intents, and command builders
- Handles WebSocket connections and event management
- Includes all necessary Discord API type definitions

### Discord Platform Requirements

**Discord Server Configuration**:
- Community features must be enabled on target server
- Required for slash command registration and functionality
- Validated during bot setup process

**OAuth2 Scopes**:
- `applications.commands` - Required for slash command registration
- `bot` - Standard bot permissions

**API Endpoints**:
- Discord Gateway - WebSocket connection for real-time events
- Discord REST API - Command registration and management

### Runtime Environment

**Node.js**:
- Minimum version: 16.11.0 (required by discord.js v14)
- Built-in modules used: `readline` for CLI interaction
- No additional runtime dependencies required