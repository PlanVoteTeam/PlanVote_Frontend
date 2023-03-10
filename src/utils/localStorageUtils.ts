// Check if local storage is available
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = "test";
    const testValue = "test";
    localStorage.setItem(testKey, testValue);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}
