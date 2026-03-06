/**
 * Copilot CLI key mappings shared between coder.bot.ts and xterm.bot.ts
 * for inline keyboard button callbacks.
 */
export const COPILOT_KEY_MAP: Record<string, { sequence: string; display: string }> = {
    'esc': { sequence: '\x1b', display: 'Escape' },
    'shifttab': { sequence: '\x1b[Z', display: 'Shift+Tab (mode switch)' },
    'ctrly': { sequence: '\x19', display: 'Ctrl+Y (accept)' },
    'ctrln': { sequence: '\x0e', display: 'Ctrl+N (reject)' },
    'ctrlt': { sequence: '\x14', display: 'Ctrl+T (reasoning)' },
    'ctrll': { sequence: '\x0c', display: 'Ctrl+L (clear)' },
};

/**
 * Delay in milliseconds between sending a slash command and the Enter key.
 * This ensures the terminal processes the command text before receiving Enter.
 */
export const SLASH_COMMAND_DELAY_MS = 100;
