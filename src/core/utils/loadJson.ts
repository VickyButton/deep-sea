const ERROR_NO_DEFAULT_ON_IMPORT = 'No default export defined';

interface ExportWithDefault {
  default: unknown;
}

function hasDefaultExport(value: unknown): value is ExportWithDefault {
  return typeof value === 'object' && value !== null && 'default' in value;
}

export async function loadJson(path: string) {
  const response: unknown = await import(/* @vite-ignore */ path, {
    with: {
      type: 'json',
    },
  });

  if (!hasDefaultExport(response)) throw new Error(ERROR_NO_DEFAULT_ON_IMPORT);

  return response.default;
}
