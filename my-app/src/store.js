import { writable } from 'svelte/store';
export const current_ques = writable(0);
// name="e"
export const post = writable([]);
export const user_chk = writable([]);
export const attempted = writable(0);
export const review_ftr = writable(false);
export const choose__ans = writable([]);
