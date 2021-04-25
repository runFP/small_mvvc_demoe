import {ViewModal} from '../../mvvc_lib/viewModal'

class HomeComponent {
    constructor() {
        this.name = 'home';
    }
}

const vm = new ViewModal();
vm.connect(HomeComponent);
