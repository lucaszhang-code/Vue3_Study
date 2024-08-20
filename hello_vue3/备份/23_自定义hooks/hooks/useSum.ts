import {computed, ref} from "vue";

export function useSum() {
    let sum = ref(0)
    let bigSum = computed(() => {
        return sum.value * 10;
    })

    function add() {
        sum.value++
    }

    return {sum, add, bigSum}
}


