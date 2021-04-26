import {ViewModal} from "./viewModal";

export class Compiler {
    constructor() {
        this.vm = new ViewModal();
    }

    /**
     * compile the html label to retrieve custom directive
     * @param elementId
     * @param modal
     */
    compile(elementId, modal) {
        const scopeEl = document.querySelector(elementId);
        this.vm.connect(elementId, modal);
        this._recursiveNode(scopeEl, elementId)
    }

    /**
     * recursive compile nodes
     * @param node
     * @param elementId
     * @private
     */
    _recursiveNode(node, elementId) {
        if (utils.isElementNode(node)) {
            this._compileElement(node, elementId);
        } else if (utils.isTextNode(node)) {
            this._compileText(node, elementId);
        }
        if (node.childNodes) {
            Array.from(node.childNodes).forEach(childNode => this._recursiveNode(childNode, elementId));
        }
    }

    _compileElement(node, elementId) {
        const reg = /c-/;
        Array.from(node.attributes).forEach(attr => {
            if (utils.isAttrNode(attr)) {
                if (reg.test(attr.nodeName)) {
                    const directiveType = attr.nodeName.split('-')[1];
                    const state = attr.value;
                    const bindingInf = {node, directiveType, state, id: elementId};
                    this.vm.writeValue(bindingInf);
                    this.vm.bindInfToState(elementId, state, bindingInf);
                    this._registerOnChange(bindingInf);
                }
            }
        })
    }

    _compileText(node, elementId) {
        const reg = /(\{\{([a-zA-Z0-9_$\-]*)\}\})/;
        let value = node.nodeValue;
        const match = reg.exec(value);
        if (match !== null) {
            const state = match[2];
            const bindingInf = {node, state, id: elementId, match}
            this.vm.bindInfToState(elementId, state, bindingInf);
            this.vm.writeValue(bindingInf);
        }
    }

    _registerOnChange(inf) {
        if (utils.isHTMLInputElement(inf.node) && inf.directiveType === 'value') {
            inf.node.addEventListener('input', e => {
                this.vm.updateModal(inf, e.target.value);
            });
        }
    }
}

const utils = {
    isElementNode: (el) => {
        return el.nodeType === 1;
    },
    isAttrNode: (el) => {
        return el.nodeType === 2;
    },
    isTextNode: (el) => {
        return el.nodeType === 3;
    },
    isHTMLInputElement: (node) => {
        return node instanceof HTMLInputElement;
    },
}

