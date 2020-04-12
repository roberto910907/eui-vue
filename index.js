/* eslint-disable */
import Vue from 'vue';
import EuiSwitch from './src/components/form/switch/EuiSwitch';
import EuiIcon from './src/components/icon/EuiIcon';
import EuiTable from './src/components/table/EuiTable';
import EuiPanel from './src/components/panel/EuiPanel';
import EuiFieldText from './src/components/form/field-text/EuiFieldText';
import EuiSelect from './src/components/form/select/EuiSelect';
import {EuiCheckbox, EuiCheckboxGroup} from './src/components/form/checkbox';
import EuiButtonIcon from './src/components/button/EuiButtonIcon';
import EuiButton from './src/components/button/EuiButton';
import EuiButtonEmpty from './src/components/button/EuiButtonEmpty';
import EuiCodeBlock from './src/components/code/EuiCodeBlock';
import EuiLoadingSpinner from './src/components/loading/EuiLoadingSpinner';
import EuiToast from './src/components/toast';
import {EuiModal, Modal} from './src/components/modal';

const components = [
    EuiIcon,
    EuiPanel,
    EuiTable,
    EuiSwitch,
    EuiButton,
    EuiButtonIcon,
    EuiButtonEmpty,
    EuiFieldText,
    EuiSelect,
    EuiCheckbox,
    EuiCheckboxGroup,
    EuiCodeBlock,
    EuiLoadingSpinner,
    EuiModal
];

// Installation of the library as a plugin
export function install(Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });

    Vue.prototype.$euitoast = EuiToast;
    Vue.prototype.$euialert = Modal.alert;
    Vue.prototype.$euiconfirm = Modal.confirm;
}

if (typeof window !== 'undefined' && window.Vue) {
    Vue.use({install});
}

// Library export as a plugin
export default {install: install}

// Export of the components individually
export {
    EuiSwitch,
    EuiIcon,
    EuiTable,
    EuiPanel,
    EuiFieldText,
    EuiSelect,
    EuiCheckbox,
    EuiCheckboxGroup,
    EuiButton,
    EuiButtonIcon,
    EuiButtonEmpty,
    EuiCodeBlock,
    EuiLoadingSpinner,
    EuiModal,
    EuiToast,
    Modal
};
