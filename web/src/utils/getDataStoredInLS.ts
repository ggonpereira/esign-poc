export function getDataFromLS<T>(itemKey: string) {
  const docsFromLS = window.localStorage.getItem(itemKey);

  if (docsFromLS) {
    const parsedDocs = JSON.parse(docsFromLS);

    return parsedDocs as T[];
  }
}
