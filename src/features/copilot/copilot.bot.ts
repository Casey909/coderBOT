import { Bot, Context } from 'grammy';
import { AccessControlMiddleware } from '../../middleware/access-control.middleware.js';
import { ErrorUtils } from '../../utils/error.utils.js';

export class CopilotBot {
    private bot: Bot | null = null;
    private botId: string;

    constructor(botId: string) {
        this.botId = botId;
    }

    registerHandlers(bot: Bot): void {
        this.bot = bot;
        // Capture all text messages and reply
        bot.on('message:text', AccessControlMiddleware.requireAccess, this.handleTextMessage.bind(this));
        console.log(`[${this.botId}] CopilotBot handlers registered`);
    }

    private async handleTextMessage(ctx: Context): Promise<void> {
        try {
            await ctx.reply('hello world');
        } catch (error) {
            console.error(`[${this.botId}] Error handling text message:`, ErrorUtils.formatError(error));
        }
    }
}
