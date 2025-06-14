# Changelog

## [1.4.0] - 2025-06-11
### Added
- For each specified markov channel, the bot fetches and loads the last 46000 messages on bot startup. 
- Increased markov state size to 2 and minimum output length to at least 3 words/tokens. 

## Removed
- Cutting down the markov corpus when it becomes too big. 

## [1.3.0] - 2025-05-12
### Added
- Purge command that clears the last X number of messages the bot has posted.
- Blacklist that will prevent specific users from accessing the bot.

### Fixed
- Client will not be passed down the chain, as that was redundant. 
- Qwen3 response will now be split into chunks anod not be cut off by Discord's API limits.

## [1.2.0] - 2025-05-07
### Added
- Added a chatbot, triggered by pinging the bot. Chatbot is based on DavidAU/Qwen3-8B-64k-Context-2X-Josiefied-Uncensored.

## [1.1.0] - 2025-05-01
### Changed
- Modal added to /tldr.
- Summarization now uses Orenguteng/Llama-3-8B-Lexi-Uncensored, a text-generative LLM.

## [1.0.2] - 2025-04-28
### Fixed
- Summarization now does not send empty input to model.
- Summarization now skips the latest message, which is always the command input.

## [1.0.1] - 2025-04-28
### Fixed
- Summarization can now support up to 200 messages.

## [1.0.0] - 2025-04-27
### Added
- Begin changelog.
