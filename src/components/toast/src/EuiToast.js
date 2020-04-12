import Vue from 'vue';
import Main from './EuiToast.vue';
import merge from '../../../util/merge';
import { PopupManager } from '../../../util/popup';
import { isVNode } from '../../../util/vdom';

const EuiToastConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const EuiToast = function (options) {
    if (Vue.prototype.$isServer) return;
    options = merge({}, options);
    const userOnClose = options.onClose;
    const id = 'euitoast_' + seed++;
    const position = options.position || 'top-right';
    
    options.onClose = function () {
        EuiToast.close(id, userOnClose);
    };
    
    instance = new EuiToastConstructor({
        data: options
    });
    
    if (isVNode(options.message)) {
        instance.$slots.default = [options.message];
        options.message = 'REPLACED_BY_VNODE';
    }
    instance.id = id;
    instance.visible = true;
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.dom = instance.$el;
    instance.dom.style.zIndex = PopupManager.nextZIndex();
    
    let verticalOffset = options.offset || 0;
    instances.filter(item => item.position === position).forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16;
    });
    verticalOffset += 16;
    instance.verticalOffset = verticalOffset;
    instances.push(instance);
    
    return instance;
};

['success', 'warning', 'info', 'error'].forEach(type => {
    EuiToast[type] = options => {
        if (typeof options === 'string' || isVNode(options)) {
            options = {
                message: options
            };
        }
        options.type = type;
        
        return EuiToast(options);
    };
});

EuiToast.close = function (id, userOnClose) {
    let index = -1;
    const len = instances.length;
    const instance = instances.filter((instance, i) => {
        if (instance.id === id) {
            index = i;
            
            return true;
        }
        
        return false;
    })[0];
    
    if (!instance) return;
    if (typeof userOnClose === 'function') {
        userOnClose(instance);
    }
    instances.splice(index, 1);
    
    if (len <= 1) return;
    const position = instance.position;
    const removedHeight = instance.dom.offsetHeight;
    for (let i = index; i < len - 1; i++) {
        if (instances[i].position === position) {
            instances[i].dom.style[instance.verticalProperty] =
                parseInt(instances[i].dom.style[instance.verticalProperty], 10) - removedHeight - 16 + 'px';
        }
    }
};

EuiToast.closeAll = function () {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close();
    }
};

export default EuiToast;
