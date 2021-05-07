export function getMemoriaLocal(item) {
    return window.localStorage.getItem(item.toString());
}

export function limparStorage() {
    window.localStorage.clear;
}

export function removerItem(item) {
    window.localStorage.removeItem(item.toString());
}
