// composables/useClickOutside.js
import { onMounted, onBeforeUnmount } from 'vue';

export function useClickOutside(refElement, callback) {
    const handleClickOutside = (event) => {
        if (refElement.value && !refElement.value.contains(event.target)) {
            callback(event);
        }
    };

    onMounted(() => {
        document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside);
    });
}