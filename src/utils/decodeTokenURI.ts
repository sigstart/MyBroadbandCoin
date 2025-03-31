export function decodeTokenURI(dataUri: string) {
    const base64 = dataUri.replace('data:application/json;base64,', '');
    const json = atob(base64);
    return JSON.parse(json);
}