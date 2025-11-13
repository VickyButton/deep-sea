/**
 * Triggers a file download without user input.
 *
 * @param fileName The name to download the file as, including the file extension.
 * @param file The file to download.
 */
export function downloadFile(fileName: string, file: Blob) {
  const link = document.createElement('a');
  const url = URL.createObjectURL(file);

  link.href = url;
  link.download = fileName;
  link.style.display = 'none';

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
