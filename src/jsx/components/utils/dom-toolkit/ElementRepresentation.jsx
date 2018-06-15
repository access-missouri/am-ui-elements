export default class ElementRepresentation {
    constructor(domElement){
        this.domElement = domElement;
    }

    addClass(className){
        if(this.domElement.classList.contains(className)){
            return;
        }
        this.domElement.classList.add(className);
    }

    removeClass(className){
        if(!this.domElement.classList.contains(className)){
            return;
        }
        this.domElement.classList.remove(className);
    }


    hide(){
        this.addClass('am-hidden');
        this.removeClass('am-unhidden');
    }

    unHide(){
        this.addClass('am-unhidden');
        this.removeClass('am-hidden');
    }

    elementContainsText(inStr){
        let elementText = this.domElement.textContent.toUpperCase();
        if(elementText.includes(inStr.toUpperCase())){
            return true;
        }
        return false;
    }

    hideOnlyIfNotContains(inStr){
        if(this.elementContainsText(inStr)){
            this.unHide();
        }
        else{
            this.hide();
        }
    }

}