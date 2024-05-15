export type Storage = "local";

type Data = any;

type StorageProvider = {
  save: (key: string, data: Data) => Promise<void>;
  load: (key: string) => Promise<Data | null>;
};

export function initStorage(storage: Storage) {
  let provider: StorageProvider;
  switch (storage) {
    case "local":
      provider = {
        save: async (key, data) => {
          localStorage.setItem(localStorageKey(key), JSON.stringify(data));
        },
        load: async (key) => {
          const d = localStorage.getItem(localStorageKey(key));
          if (d === null) {
            return null;
          }
          return JSON.parse(d);
        },
      };
      break;
    default:
      throw new Error(`unknown storage: ${storage}`);
  }
  return provider;
}

function localStorageKey(key: string) {
  return `luo:storage:${key}`;
}
