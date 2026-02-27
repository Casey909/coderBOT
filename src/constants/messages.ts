/**
 * Message constants for consistent messaging across the application
 */
export const Messages = {
    // Session-related messages
    NO_ACTIVE_SESSION: '❌ No active session.\n\nUse /copilot to start one.',
    SESSION_ALREADY_EXISTS: '⚠️ You already have an active terminal session.\n\n' +
        'Use /close to terminate it first, or continue using it.',

    // View/refresh hints
    VIEW_SCREEN_HINT: 'Use /screen to view the output.',

    // Session close messages
    NO_SESSION_TO_CLOSE: '⚠️ No active terminal session to close.\n\nUse /copilot to start one.',

    // Callback query errors
    INVALID_CALLBACK: '❌ Invalid callback',
    NO_ACTIVE_TERMINAL_SESSION: '❌ No active terminal session',

    // Status messages
    REFRESHING: '🔄 Refreshing...',
    CAPTURING_SCREEN: '📸 Capturing terminal screen...',
    SPAWNING_SESSION: '🚀 Spawning now...',

    // Audio transcription messages
    TRANSCRIBING_AUDIO: '🎙️ Transcribing audio...',
} as const;

/**
 * Success message templates
 */
export const SuccessMessages = {
    SENT: (text?: string) => text ? `✅ Sent: ${text}` : '✅ Sent',
    SENT_CONTROL_KEY: (key: string) =>
        `✅ Sent Ctrl+${key}`,
    SENT_SPECIAL_KEY: (keyName: string) =>
        `✅ Sent ${keyName}`,
} as const;

/**
 * Error action descriptions for consistent error formatting
 */
export const ErrorActions = {
    START_TERMINAL: 'start terminal session',
    SEND_TO_TERMINAL: 'send to terminal',
    CLOSE_TERMINAL: 'close terminal session',
    SEND_KEY: 'send key',
    SEND_TAB: 'send Tab',
    SEND_ENTER: 'send Enter',
    SEND_SPACE: 'send Space',
    SEND_DELETE: 'send Delete key',
    SEND_CTRL_C: 'send Ctrl+C',
    SEND_CTRL_X: 'send Ctrl+X',
    SEND_ESCAPE: 'send Escape key',
    SEND_CONTROL_CHARACTER: 'send control character',
    SEND_KEYS: 'send keys',
    CAPTURE_SCREEN: 'capture terminal screen',
    CREATE_TERMINAL: 'create terminal session',
    TRANSCRIBE_AUDIO: 'transcribe audio',
} as const;

/**
 * Audio transcription error messages
 */
export const AudioErrors = {
    NO_API_KEY_CONFIGURED: '⚠️ Audio transcription is not configured.\n\n' +
        'Please set TTS_API_KEY in your .env file with either:\n' +
        '• OpenAI API key (sk-...)\n' +
        '• Google Gemini API key',

    INVALID_API_KEY: '❌ Invalid API key.\n\n' +
        'Please check your TTS_API_KEY configuration.',

    TRANSCRIPTION_FAILED: '❌ Failed to transcribe audio.\n\n' +
        'Please try again or check your API key and quota.',

    UNSUPPORTED_FORMAT: '⚠️ Unsupported audio format.\n\n' +
        'Supported formats: .ogg, .oga, .mp3, .wav, .webm, .m4a, .flac, .opus',

    FILE_TOO_LARGE: '⚠️ Audio file is too large.\n\n' +
        'Maximum size: 25MB',

    DOWNLOAD_FAILED: '❌ Failed to download audio file from Telegram.\n\n' +
        'Please try sending the audio again.',

    RATE_LIMIT: '⚠️ API rate limit exceeded.\n\n' +
        'Please wait a moment and try again.',

    QUOTA_EXCEEDED: '❌ API quota exceeded.\n\n' +
        'Please check your API account billing and limits.',
} as const;
