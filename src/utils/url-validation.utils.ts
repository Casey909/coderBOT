/**
 * URL Validation Utilities
 * 
 * Provides secure URL validation for external resources,
 * particularly for Telegram API endpoints.
 */

/**
 * Validate that a URL is from the official Telegram API domain
 * Prevents potential URL injection or redirection attacks
 * 
 * @param url - The URL to validate
 * @returns true if URL is a valid Telegram API endpoint
 * @throws Error if URL is invalid or not from Telegram
 */
export function validateTelegramUrl(url: string): boolean {
    try {
        const parsedUrl = new URL(url);
        
        // Check protocol - must be HTTPS
        if (parsedUrl.protocol !== 'https:') {
            throw new Error('Telegram API URLs must use HTTPS protocol');
        }
        
        // Check hostname - must be api.telegram.org
        if (parsedUrl.hostname !== 'api.telegram.org') {
            throw new Error(`Invalid Telegram API hostname: ${parsedUrl.hostname}`);
        }
        
        // Check path structure for file downloads
        if (url.includes('/file/bot')) {
            // Expected format: /file/bot<TOKEN>/<FILE_PATH>
            const pathMatch = parsedUrl.pathname.match(/^\/file\/bot[^/]+\/.+$/);
            if (!pathMatch) {
                throw new Error('Invalid Telegram file download URL structure');
            }
        }
        
        return true;
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error(`Invalid URL format: ${error.message}`);
        }
        throw error;
    }
}

/**
 * Sanitize a Telegram file URL to ensure it's safe to use
 * Returns the validated URL or throws an error
 * 
 * @param url - The URL to sanitize
 * @returns The validated URL
 * @throws Error if URL is invalid
 */
export function sanitizeTelegramFileUrl(url: string): string {
    validateTelegramUrl(url);
    
    // Additional sanitization - ensure no query parameters or fragments
    // that could be used for injection
    const parsedUrl = new URL(url);
    
    if (parsedUrl.search || parsedUrl.hash) {
        console.warn('[Security] Removing query parameters or hash from Telegram URL');
        parsedUrl.search = '';
        parsedUrl.hash = '';
    }
    
    return parsedUrl.toString();
}

/**
 * Build a validated Telegram file URL
 * 
 * @param botToken - The bot token
 * @param filePath - The file path from Telegram API
 * @returns A validated Telegram file URL
 * @throws Error if construction fails or validation fails
 */
export function buildTelegramFileUrl(botToken: string, filePath: string): string {
    // Validate inputs
    if (!botToken || typeof botToken !== 'string') {
        throw new Error('Bot token is required and must be a string');
    }
    
    if (!filePath || typeof filePath !== 'string') {
        throw new Error('File path is required and must be a string');
    }
    
    // Sanitize file path to prevent path traversal
    // Remove any ../ or ./ patterns
    const sanitizedPath = filePath.replace(/\.\.\//g, '').replace(/^\.\//g, '');
    
    if (sanitizedPath !== filePath) {
        console.warn('[Security] Path traversal attempt detected and sanitized');
    }
    
    // Build URL
    const url = `https://api.telegram.org/file/bot${botToken}/${sanitizedPath}`;
    
    // Validate the constructed URL
    validateTelegramUrl(url);
    
    return url;
}

/**
 * Validate a CDN URL for XTerm resources
 * Only allows specific trusted CDN domains
 * 
 * @param url - The CDN URL to validate
 * @returns true if URL is from a trusted CDN
 */
export function validateCdnUrl(url: string): boolean {
    const trustedCdns = [
        'cdn.jsdelivr.net',
        'unpkg.com'
    ];
    
    try {
        const parsedUrl = new URL(url);
        
        if (parsedUrl.protocol !== 'https:') {
            throw new Error('CDN URLs must use HTTPS protocol');
        }
        
        if (!trustedCdns.includes(parsedUrl.hostname)) {
            throw new Error(`Untrusted CDN hostname: ${parsedUrl.hostname}`);
        }
        
        return true;
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error(`Invalid URL format: ${error.message}`);
        }
        throw error;
    }
}
