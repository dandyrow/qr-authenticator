
import { Storage } from "@capacitor/storage";
import { AsyncStorage } from "vuex-persist";

class CapacitorStorage implements AsyncStorage {
    _config?: { name: string; };

    async getItem<T>(key: string): Promise<T> {
        const { value } = await Storage.get({ key });
        return value as any;
    }

    async setItem<T>(key: string, data: T): Promise<T> {
        await Storage.set({
            key: key,
            value: JSON.stringify(data),
        });
        return undefined as any;
    }

    async removeItem(key: string): Promise<void> {
        await Storage.remove({ key });
    }

    async clear(): Promise<void> {
        await Storage.clear();
    }

    async length(): Promise<number> {
        const { keys } = await Storage.keys();
        return keys.length;
    }

    async key(keyIndex: number): Promise<string> {
        const { keys } = await Storage.keys();
        return keys[keyIndex];
    }
}

export default CapacitorStorage;