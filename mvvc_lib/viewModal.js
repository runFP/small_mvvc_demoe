export class ViewModal {
    /**
     * 将模型和视图关联
     * @param modal
     * @param dom
     */
    connect(modal, domId) {
        document.querySelector(`#${domId}`);
    }
}