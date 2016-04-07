export function waitEvent(source: any, eventType: string) {
  return new Promise(resolve => {
    const callback = event => {
      source.removeEventListener(eventType, callback);
      resolve(event);
    }

    source.addEventListener(eventType, callback);
  });
}
