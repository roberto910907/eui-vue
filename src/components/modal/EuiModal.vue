<template>
  <div class="euiOverlayMask">
    <div data-focus-lock-disabled="false">
      <div :class="classObject" tabindex="0">
        <button
          @click="toogleModal(false)"
          @keydown.enter="toogleModal(false)"
          aria-label="Closes this modal window"
          class="euiButtonIcon euiButtonIcon--text euiModal__closeIcon"
          type="button"
          v-if="showClose"
        >
          <EuiIcon icon-name="close"></EuiIcon>
        </button>
        <div :style="setMaxHeight" class="euiModal__flex">
          <div class="euiModalHeader">
            <div class="euiModalHeader__title">{{title}}</div>
          </div>
          <div class="euiModalBody">
            <div class="euiModalBody__overflow" v-if="!isHandleForm">
              <slot></slot>
            </div>
            <slot name="form"></slot>
          </div>
          <div class="euiModalFooter" v-if="!isHandleForm">
            <slot name="modalFooter">
              <EuiButtonEmpty
                :disabled="cancelButtonDisabled"
                :title="cancelButtonText"
                @click="toogleModal(false)"
                v-show="showCancelButton"/>
              <EuiButton
                :color="saveButtonClass"
                :is-loading="saveButtonLoading"
                :round="roundButton"
                :title="saveButtonText"
                @click="confirmed"
                type="button"
                v-show="showSaveButton"/>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import EuiIcon from '../icon/EuiIcon';
    import EuiButton from '../button/EuiButton';
    import EuiButtonEmpty from '../button/EuiButtonEmpty';

    const colorToNameMap = {
        primary: 'primary',
        secondary: 'secondary',
        warning: 'warning',
        danger: 'danger',
        ghost: 'euiButton--ghost'
    };

    export default {
        name: 'EuiModal',
        components: {
            EuiIcon,
            EuiButton,
            EuiButtonEmpty,
        },
        props: {
            title: {
                type: String,
                default: true
            },
            maxHeight: {
                type: String,
                required: false
            },
            fullWidth: {
                type: Boolean,
                default: false
            },
            saveButtonText: {
                type: String,
                default: 'Save'
            },
            cancelButtonText: {
                type: String,
                default: 'Cancel'
            },
            saveColor: {
                type: String,
                default: 'primary'
            },
            toogle: {
                type: Function,
            },
            submit: {
                type: Function,
            },
            saveButtonLoading: {
                type: Boolean,
                default: false
            },
            showClose: {
                type: Boolean,
                default: true
            },
            handleForm: {
                type: Boolean,
                default: false
            },
            roundButton: {
                type: Boolean,
                default: false
            },
            cancelButtonDisabled: {
                type: Boolean,
                default: false
            },
            showSaveButton: {
                type: Boolean,
                default: true
            },
            showCancelButton: {
                type: Boolean,
                default: true
            },
            classes: {
                type: String
            }
        },
        data() {
            return {
                isHandleForm: this.handleForm,
                saveButtonColor: this.saveColor,
                openModal: this.toogle
            }
        },
        computed: {
            saveButtonClass() {
                return `${colorToNameMap[this.saveButtonColor]}`;
            },
            setMaxHeight() {
                return this.maxHeight ? `max-height:${this.maxHeight} !important` : '';
            },
            classObject() {
                return `euiModal
                ${!this.fullWidth ? 'euiModal--maxWidth-default' : 'euiModal--large'}
                ${this.classes}`;
            }
        },
        methods: {
            confirmed() {
                this.$emit('confirm');
            },
            toogleModal(val) {
                if (this.openModal) {
                    this.openModal(val);
                }

                this.$emit('close');
            }
        }
    }
</script>
