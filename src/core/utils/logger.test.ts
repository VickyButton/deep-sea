import { afterEach, describe, expect, it, vi } from 'vitest';
import { timestampNow } from './dateTimeProvider';
import { downloadFile } from './downloadFile';
import { clearLogs, downloadLogs, error, log, warn } from './logger';

vi.mock('./dateTimeProvider', () => ({
  timestampNow: vi.fn(),
}));

vi.mock('./downloadFile', () => ({
  downloadFile: vi.fn(),
}));

describe('logger', () => {
  afterEach(() => {
    vi.clearAllMocks();

    clearLogs();
  });

  it('should log an error in console', () => {
    const consoleSpy = vi.spyOn(console, 'error');

    error('Error', 'message');

    expect(consoleSpy).toHaveBeenCalledWith('[Error] message');
  });

  it('should log a warning in console', () => {
    const consoleSpy = vi.spyOn(console, 'warn');

    warn('Warn', 'message');

    expect(consoleSpy).toHaveBeenCalledWith('[Warn] message');
  });

  it('should log a message in console', () => {
    const consoleSpy = vi.spyOn(console, 'log');

    log('Tag', 'message');

    expect(consoleSpy).toHaveBeenCalledWith('[Tag] message');
  });

  it('should download logs', () => {
    vi.mocked(timestampNow).mockReturnValueOnce(1000);

    log('1', '2');
    warn('3', '4');
    error('5', '6');

    downloadLogs();

    const blob = new Blob(['[1] 2\n[3] 4\n[5] 6'], { type: 'text/plain' });

    expect(downloadFile).toHaveBeenCalledWith('deep_sea_logs-1000.txt', blob);
  });
});
