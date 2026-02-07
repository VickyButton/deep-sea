import { getConfig } from 'config';
import { timestampNow } from './dateTimeProvider';
import { downloadFile } from './downloadFile';

let logs: string[] = [];

/**
 * Prints a formatted log in the console and saves formatted log.
 *
 * @param tag An identifier for the log's origin.
 * @param message The log message.
 */
export function log(tag: string, message: string) {
  const config = getConfig();
  const formattedLog = formatLog(tag, message);

  if (config.dev.printLogs) console.log(formattedLog);

  logs.push(formattedLog);
}

/**
 * Prints a formatted warning log in the console and saves formatted warning log.
 *
 * @param tag An identifier for the log's origin.
 * @param message The log message.
 */
export function warn(tag: string, message: string) {
  const config = getConfig();
  const formattedLog = formatLog(tag, message);

  if (config.dev.printLogs) console.warn(formattedLog);

  logs.push(formattedLog);
}

/**
 * Prints a formatted error log in the console and saves formatted error log.
 *
 * @param tag An identifier for the log's origin.
 * @param message The log message.
 */
export function error(tag: string, message: string) {
  const config = getConfig();
  const formattedLog = formatLog(tag, message);

  if (config.dev.printLogs) console.error(formattedLog);

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
