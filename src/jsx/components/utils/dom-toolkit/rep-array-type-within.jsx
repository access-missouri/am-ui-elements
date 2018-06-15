import ElementRepresentation from './ElementRepresentation';

export function getRepresentationArrayFromTypeWithin(type, domElement){
    let nodes = [].slice.call(domElement.querySelectorAll(type));

    return nodes.filter(function(el){
        return !(el.classList.contains('am-notouch'));
    }).map(function(el){
        return new ElementRepresentation(el);
    });
}