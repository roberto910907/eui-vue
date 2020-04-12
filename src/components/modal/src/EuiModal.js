const defaults = {
    title: null,
    message: '',
    type: '',
    iconClass: '',
    showInput: false,
    showClose: true,
    modalFade: true,
    lockScroll: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    closeOnHashChange: true,
    inputValue: null,
    inputPlaceholder: '',
    inputType: 'text',
    inputPattern: null,
    inputValidator: null,
    inputErrorMessage: '',
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonPosition: 'right',
    confirmButtonHighlight: false,
    cancelButtonHighlight: false,
    confirmButtonText: '',
    cancelButtonText: '',
    confirmButtonClass: '',
    cancelButtonClass: '',
    customClass: '',
    beforeClose: null,
    dangerouslyUseHTMLString: false,
    center: false,
    roundButton: false,
    distinguishCancelAndClose: false
};

import Vue from 'vue';
import MainVue from './main.vue';
import merge from '../../../util/merge';
import { isVNode } from '../../../util/vdom';

const EuiModalConstructor = Vue.extend(MainVue);

let currentMsg, instance;
let msgQueue = [];

const defaultCallback = action => {
    if (currentMsg) {
        let callback = currentMsg.callback;
        if (typeof callback === 'function') {
            if (instance.showInput) {
                callback(instance.inputValue, action);
            } else {
                callback(action);
            }
        }
        if (currentMsg.resolve) {
            if (action === 'confirm') {
                if (instance.showInput) {
                    currentMsg.resolve({value: instance.inputValue, action});
                } else {
                    currentMsg.resolve(action);
                }
            } else if (currentMsg.reject && (action === 'cancel' || action === 'close')) {
                currentMsg.reject(action);
            }
        }
    }
};

const initInstance = () => {
    instance = new EuiModalConstructor({
        el: document.createElement('div')
    });
    
    instance.callback = defaultCallback;
};

const showNextMsg = () => {
    if (!instance) {
        initInstance();
    }
    instance.action = '';
    
    if (!instance.visible || instance.closeTimer) {
        if (msgQueue.length > 0) {
            currentMsg = msgQueue.shift();
            
            let options = currentMsg.options;
            for (let prop in options) {
                if (options.hasOwnProperty(prop)) {
                    instance[prop] = options[prop];
                }
            }
            if (options.callback === undefined) {
                instance.callback = defaultCallback;
            }
            
            let oldCb = instance.callback;
            instance.callback = (action, instance) => {
                oldCb(action, instance);
                showNextMsg();
            };
            if (isVNode(instance.message)) {
                instance.$slots.default = [instance.message];
                instance.message = null;
            } else {
                delete instance.$slots.default;
            }
            ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape', 'closeOnHashChange'].forEach(prop => {
                if (instance[prop] === undefined) {
                    instance[prop] = true;
                }
            });
            document.body.appendChild(instance.$el);
            
            Vue.nextTick(() => {
                instance.visible = true;
            });
        }
    }
};

const EuiModal = function (options, callback) {
    if (Vue.prototype.$isServer) return;
    if (typeof options === 'string' || isVNode(options)) {
        options = {
            message: options
        };
        if (typeof arguments[1] === 'string') {
            options.title = arguments[1];
        }
    } else if (options.callback && !callback) {
        callback = options.callback;
    }
    
    if (typeof Promise !== 'undefined') {
        return new Promise((resolve, reject) => { // eslint-disable-line
            msgQueue.push({
                options: merge({}, defaults, EuiModal.defaults, options),
                callback: callback,
                resolve: resolve,
                reject: reject
            });
            
            showNextMsg();
        });
    } else {
        msgQueue.push({
            options: merge({}, defaults, EuiModal.defaults, options),
            callback: callback
        });
        
        showNextMsg();
    }
};

EuiModal.setDefaults = defaults => {
    EuiModal.defaults = defaults;
};

EuiModal.alert = (message, title, options) => {
    if (typeof title === 'object') {
        options = title;
        title = '';
    } else if (title === undefined) {
        title = '';
    }
    return EuiModal(merge({
        title: title,
        message: message,
        $type: 'alert',
        closeOnPressEscape: false,
        closeOnClickModal: false
    }, options));
};

EuiModal.confirm = (message, title, options) => {
    if (typeof title === 'object') {
        options = title;
        title = '';
    } else if (title === undefined) {
        title = '';
    }
    return EuiModal(merge({
        title: title,
        message: message,
        $type: 'confirm',
        showCancelButton: true
    }, options));
};

EuiModal.prompt = (message, title, options) => {
    if (typeof title === 'object') {
        options = title;
        title = '';
    } else if (title === undefined) {
        title = '';
    }
    return EuiModal(merge({
        title: title,
        message: message,
        showCancelButton: true,
        showInput: true,
        $type: 'prompt'
    }, options));
};

EuiModal.close = () => {
    instance.doClose();
    instance.visible = false;
    msgQueue = [];
    currentMsg = null;
};

export default EuiModal;
