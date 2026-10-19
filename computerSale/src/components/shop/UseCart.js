// src/composables/useCart.js
// One shared cart for the whole app: every component that calls useCart() sees the same items.
import { ref, computed, watch } from "vue";

const STORAGE_KEY = "cart-items";

const load = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
};

// created once, outside the function, so it is shared
const items = ref(load());

// keep the cart after a page refresh
watch(
    items,
    (value) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
        } catch {
            /* storage full or blocked: the cart still works for this session */
        }
    },
    { deep: true }
);

export function useCart() {
    // product = { _id, name, branch, price, image }
    const add = (product) => {
        const found = items.value.find((i) => i._id === product._id);
        if (found) found.qty++;
        else items.value.push({ ...product, qty: 1 });
    };

    const increase = (id) => {
        const found = items.value.find((i) => i._id === id);
        if (found) found.qty++;
    };

    const decrease = (id) => {
        const found = items.value.find((i) => i._id === id);
        if (!found) return;
        found.qty--;
        if (found.qty < 1) remove(id);
    };

    const remove = (id) => {
        items.value = items.value.filter((i) => i._id !== id);
    };

    const clear = () => {
        items.value = [];
    };

    const count = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0));
    const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0));

    return { items, add, increase, decrease, remove, clear, count, total };
}