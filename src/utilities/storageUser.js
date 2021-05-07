
export function getMemoriaLocal(item) {
    return window.localStorage.getItem(item.toString());
}

export function limparStorage() {
    window.localStorage.clear();
    window.location.reload();
}

export function removerItem(item) {
    window.localStorage.removeItem(item.toString());
    window.location.reload();
}
