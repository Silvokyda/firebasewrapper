import firestore from "@react-native-firebase/firestore";

function createAsyncLoggingWrapper() {
  return new Proxy(firestore, {
    get(target, property, receiver) {
      const originalProperty = target[property];

      if (typeof originalProperty === 'function') {
        return function (...args) {
          const result = originalProperty.apply(this, args);

          if (result instanceof Promise) {
            const startTime = Date.now();

            return result.finally(() => {
              const endTime = Date.now();
              console.log(`Async request to ${property} took ${endTime - startTime} ms`);
            });
          }

          return result;
        };
      }

      return originalProperty;
    },
  });
}

const firestoreWrapper = createAsyncLoggingWrapper();

export default firestoreWrapper;
