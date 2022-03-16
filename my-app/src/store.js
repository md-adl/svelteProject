import {writable} from 'svelte/store'
    export const currentQues = writable(0);
    // name="e"
    export const post = writable([])
    export const userChecked = writable([])
    export const attempted = writable(0);
    export const reviewFooter = writable(false)
    export const chooseAns=writable([])
    
    