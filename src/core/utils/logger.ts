import { timestampNow } from './dateTimeProvider';
import { downloadFile } from './downloadFile';

let logs: string[] = [];

/**
 * Prints a formatted log in the console and saves formatted log.
 *
 * @param tag The log type or an identifier for where the log originated.
 * @param message The log message.
 */
export function log(tag: string, message: string) {
  const formattedLog = formatLog(tag, message);

  switch (tag.toLowerCase()) {
    case 'error':
      console.error(formattedLog);

      break;
    case 'warn':
      console.warn(formattedLog);

      break;
    default:
      console.log(formattedLog);
  }

  logs.push(formattedLog);
}

/**
 * Clears out saved logs.
 */
export function clearLogs() {
  logs = [];
}

/**
 * Triggers a download of saved logs as a text file.
 */
export function downloadLogs() {
  const formattedDateTime = String(timestampNow());
  const fileName = `deep_sea_logs-${formattedDateTime}.txt`;
  const file = logsToTextFile();

  downloadFile(fileName, file);
}

function formatLog(tag: string, message: string) {
  return `[${tag}] ${message}`;
}

function logsToTextFile() {
  const text = logs.join('\n');
  const blob = new Blob([text], { type: 'text/plain' });

  return blob;
}
