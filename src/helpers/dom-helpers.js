export function recorrerHTMLCollection(collection, lambda = (elemento = new HTMLElement()) => {}) {
    
    for (let i = 0; i < collection.length; i++) {
        lambda(collection[i]);
    }

}