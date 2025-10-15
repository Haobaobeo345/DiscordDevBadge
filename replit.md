# Discord Developer Badge Bot

## Overview

A lightweight Discord bot built with Node.js and Discord.js v14 that helps users obtain the Discord Developer Badge. The bot uses an interactive command-line setup process to configure the bot token and validate server prerequisites, then provides a single slash command (`/activedevbadge`) to guide users through obtaining their developer badge.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Application Design

**Single-File Architecture**: The entire application logic resides in `index.js`, combining both setup workflow and bot runtime in one cohesive unit. This minimalist approach eliminates complexity and makes the codebase easy to understand and maintain.

**Interactive Setup Flow**:
- Uses Node.js built-in `readline` module for command-line interaction
- Collects bot token at runtime through secure CLI prompts (no environment variables or config files)
- Validates Discord server community status before bot initialization (required for slash commands)
- Implements strict input validation (y/n answers, non-empty token values)
- Gracefully handles invalid inputs with clear error messages and exits
- Closes readline interface immediately after setup to prevent input duplication
- Bot process remains alive after configuration to handle Discord events

**Design Rationale**: The single-file approach was chosen for simplicity and ease of deployment. For a bot with a single command, separating concerns into multiple files would add unnecessary complexity. The interactive setup ensures users are guided through prerequisites without requiring technical knowledge of environment variables or configuration files.

### Discord Integration

**Discord.js v14 Framework**:
- Leverages modern Discord.js library with minimal gateway intents
- Only requests `GatewayIntentBits.Guilds` intent to reduce overhead and improve security
- Implements slash commands using `SlashCommandBuilder` API
- Uses Discord REST API for dynamic command registration

**Command Architecture**:
- Single slash command: `/activedevbadge` - provides Discord Developer Badge information
- Commands are registered dynamically when bot becomes ready (on `ready` event)
- Uses Discord's native application commands system
- Requires `applications.commands` OAuth2 scope for proper functionality

**Permission Model**:
- Minimal required permissions: Send Messages, Use Slash Commands
- Guild-only intents to minimize data exposure and API overhead
- No message content intent needed (slash command-only bot)
- Security-first approach: requests only what's absolutely necessary

**Design Rationale**: Slash commands were chosen over traditional prefix commands for better user experience and discoverability. The minimal intent configuration ensures the bot adheres to Discord's privacy best practices and reduces potential attack surface.

### Error Handling & Validation

**Input Validation Strategy**:
- Validates setup responses (y/n answers with case-insensitive matching)
- Ensures bot token is non-empty and trimmed of whitespace
- Exits gracefully with descriptive error messages on validation failures

**Prerequisites Validation**:
- Checks Discord server community status before proceeding
- Prevents common setup mistakes by enforcing prerequisites upfront
- Provides clear instructions when requirements aren't met

**Design Rationale**: Early validation prevents runtime errors and improves user experience by catching configuration issues before the bot attempts to connect to Discord. Exit-on-error approach ensures users fix issues before the bot starts.

## External Dependencies

### Core Dependencies

**discord.js (^14.23.2)**: The official Discord API library for Node.js
- Provides WebSocket gateway connection management
- Offers high-level abstractions for Discord API interactions
- Includes builders for slash commands, embeds, and other Discord structures
- Handles automatic reconnection and rate limiting

**Node.js Built-in Modules**:
- `readline`: Interactive command-line input collection
- Standard I/O streams for user interaction

### Third-Party Services

**Discord API**: 
- WebSocket gateway for real-time bot events
- REST API for command registration and message sending
- Requires valid bot token from Discord Developer Portal
- Requires server with community features enabled

**No Database**: This bot is stateless and requires no persistent data storage. All functionality operates in-memory during runtime.

**No Additional APIs**: The bot operates entirely within Discord's ecosystem without external service dependencies.