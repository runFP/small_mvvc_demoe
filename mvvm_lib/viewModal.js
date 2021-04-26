import {error_center} from "./error";

export class ViewModal {
    constructor() {
        if (ViewModal.instance !== null) return ViewModal.instance;

        /**
         * data_structure
         * { elId:{ modal, states:{state: [bindingInf,...]} } }
         */
        this._scopeContainer = {};
        ViewModal.instance = this;
    }

    /**
     * connect view with modal
     * @param scopeId
     * @param modal
     */
    connect(scopeId, modal,) {
        this._scopeContainer[scopeId] = {modal: this._processModal(scopeId, modal), states: {}};
    }

    /**
     * bind node information to states
     * @param scopeId
     * @param state
     * @param inf
     */
    bindInfToState(scopeId, state, inf) {
        if (!this._scopeContainer[scopeId].states[state]) this._scopeContainer[scopeId].states[state] = [];
        this._scopeContainer[scopeId].states[state].push(inf);
    }

    /**
     * update state of modal with view
     * @param inf information of bind
     * @param value e.target.value
     */
    updateModal(inf, value) {
        const scopeMap = this._getScopeMap(inf.id);
        if (scopeMap.modal && inf.state in scopeMap.modal) {
            scopeMap.modal[inf.state] = value;
        } else {
            error_center.errorType.modal.noState(inf.state);
        }
    }

    /**
     * update view with state of modal
     */
    writeValue(inf) {
        let directionType = '';
        directionType = inf.directiveType;
        const scopeMap = this._getScopeMap(inf.id);

        if (scopeMap.modal && inf.state in scopeMap.modal) {
            const value = scopeMap.modal[inf.state] || '';
            if (directionType) {
                // element
                if (directionType === 'value') {
                    inf.node.value = value;
                } else if (directionType === 'text') {
                    inf.node.innerText = value;
                }
            } else {
                //test
                const match = inf.match;
                const originalInput = match.input;
                inf.node.nodeValue = originalInput.replace(match[1], value);
            }
        }
    }


    /**
     * add state change listen to modal
     * @param id
     * @param modal
     * @returns {*}
     * @private
     */
    _processModal(id, modal) {
        Object.keys(modal).forEach(state => {
            if (typeof modal[state] !== 'function') {
                let stateValue = modal[state];
                Object.defineProperty(modal, state, {
                    enumerable: true,
                    get() {
                        return stateValue;
                    },
                    set: (value) => {
                        stateValue = value;
                        this._getScopeStateInf(id, state).forEach(inf => {
                            this.writeValue(inf);
                        })
                    }
                })
            }
        });

        return modal;
    }

    _getScopeMap(id) {
        return this._scopeContainer[id];
    }

    _getScopeStateInf(id, state) {
        return this._scopeContainer[id].states[state] || [];
    }
}

ViewModal.instance = null;
