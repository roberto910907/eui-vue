<template>
  <transition name="euiModal-fade">
    <div
      class="message-box__wrapper"
      role="dialog"
      @click.self="handleWrapperClick"
      tabindex="-1"
      v-show="visible"
    >
      <div class="message-box">
        <div class="euiModal euiModal--maxWidth-default euiModal--confirmation" tabindex="0">
          <button
            class="euiButtonIcon euiButtonIcon--text euiModal__closeIcon"
            v-if="showClose"
            type="button"
            aria-label="Closes this modal window"
            @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
            @keydown.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
          >
            <EuiIcon icon-name="close"></EuiIcon>
          </button>
          <div class="euiModal__flex">
            <div class="euiModalHeader">
              <div class="euiModalHeader__title" data-test-subj="confirmModalTitleText">
                {{title}}
              </div>
            </div>
            <div class="euiModalBody">
              <slot>
                <p v-if="!dangerouslyUseHTMLString">
                  <EuiIcon icon-name="danger"></EuiIcon>
                  {{ message }}
                </p>
                <p v-else v-html="message"></p>
              </slot>
            </div>
            <div class="euiModalFooter">
              <EuiButtonEmpty
                :href="`#`"
                :title="cancelButtonText"
                v-if="showCancelButton"
                @click.native="handleAction('cancel')"
                @keydown.enter="handleAction('cancel')"></EuiButtonEmpty>
              <EuiButton
                :href="`#`"
                :title="confirmButtonText"
                :color="confirmButtonClass"
                v-show="showConfirmButton"
                :round="roundButton"
                @click.native="handleAction('confirm')"
                @keydown.enter="handleAction('confirm')"></EuiButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    import Popup from '../../../util/popup/index';
    import Dialog from '../../../util/aria-dialog';
    import EuiIcon from '../../icon/EuiIcon';
    import EuiButton from '../../button/EuiButton';
    import EuiButtonEmpty from '../../button/EuiButtonEmpty';

    let messageBox;

    export default {
        components: {
            EuiIcon,
            EuiButton,
            EuiButtonEmpty,
        },
        mixins: [Popup],
        props: {
            modal: {
                default: true
            },
            lockScroll: {
                default: true
            },
            showClose: {
                type: Boolean,
                default: true
            },
            closeOnClickModal: {
                default: true
            },
            closeOnPressEscape: {
                default: true
            },
            closeOnHashChange: {
                default: true
            },
            center: {
                default: false,
                type: Boolean
            },
            roundButton: {
                default: false,
                type: Boolean
            }
        },
        computed: {
            confirmButtonClasses() {
                return `primary`;
            },
            cancelButtonClasses() {
                return `danger`;
            }
        },
        methods: {
            getSafeClose() {
                const currentId = this.uid;
                return () => {
                    this.$nextTick(() => {
                        if (currentId === this.uid) this.doClose();
                    });
                };
            },
            doClose() {
                if (!this.visible) return;
                this.visible = false;
                this._closing = true;

                this.onClose && this.onClose();

                messageBox.closeDialog();

                if (this.lockScroll) {
                    setTimeout(this.restoreBodyStyle, 200);
                }

                this.opened = false;
                this.doAfterClose();

                setTimeout(() => {
                    if (this.action) this.callback(this.action, this);
                });
            },
            handleWrapperClick() {
                if (this.closeOnClickModal) {
                    this.handleAction(this.distinguishCancelAndClose ? 'close' : 'cancel');
                }
            },
            handleAction(action) {
                if (this.$type === 'prompt' && action === 'confirm') {
                    return;
                }

                this.action = action;

                if (typeof this.beforeClose === 'function') {
                    this.close = this.getSafeClose();
                    this.beforeClose(action, this, this.close);
                } else {
                    this.doClose();
                }
            },
            getFirstFocus() {
                const btn = this.$el.querySelector('.euiModalFooter .euiButton__content');
                const title = this.$el.querySelector('.euiModalFooter .euiModalHeader__title');
                return btn || title;
            },
            handleClose() {
                this.handleAction('close');
            }
        },
        watch: {
            visible(val) {
                if (val) {
                    this.uid++;
                    this.focusAfterClosed = document.activeElement;
                    messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFirstFocus());
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                if (this.closeOnHashChange) {
                    window.addEventListener('hashchange', this.close);
                }
            });
        },
        beforeDestroy() {
            if (this.closeOnHashChange) {
                window.removeEventListener('hashchange', this.close);
            }
            setTimeout(() => {
                messageBox.closeDialog();
            });
        },
        data() {
            return {
                uid: 1,
                title: undefined,
                message: '',
                type: '',
                iconClass: '',
                customClass: '',
                showInput: false,
                inputValue: null,
                inputPlaceholder: '',
                inputType: 'text',
                inputPattern: null,
                inputValidator: null,
                inputErrorMessage: '',
                showConfirmButton: true,
                showCancelButton: false,
                action: '',
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                confirmButtonLoading: false,
                cancelButtonLoading: false,
                confirmButtonClass: '',
                confirmButtonDisabled: false,
                cancelButtonClass: '',
                editorErrorMessage: null,
                callback: null,
                dangerouslyUseHTMLString: false,
                focusAfterClosed: null,
                isOnComposition: false,
                distinguishCancelAndClose: false
            };
        }
    };
</script>

<style scoped>
  .v-modal-enter {
    -webkit-animation: v-modal-in .2s ease;
    animation: v-modal-in .2s ease
  }

  .v-modal-leave {
    -webkit-animation: v-modal-out .2s ease forwards;
    animation: v-modal-out .2s ease forwards
  }

  @-webkit-keyframes v-modal-in {
    0% {
      opacity: 0
    }
  }

  @keyframes v-modal-in {
    0% {
      opacity: 0
    }
  }

  @-webkit-keyframes v-modal-out {
    100% {
      opacity: 0
    }
  }

  @keyframes v-modal-out {
    100% {
      opacity: 0
    }
  }

  .v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000
  }

  .message-box {
    display: inline-block;
    width: 450px;
    vertical-align: middle;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }

  .message-box__wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center
  }

  .message-box__wrapper::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle
  }


  .euiModal-fade-enter-active {
    -webkit-animation: euiModal-fade-in .3s;
    animation: euiModal-fade-in .3s
  }

  .euiModal-fade-leave-active {
    -webkit-animation: euiModal-fade-out .3s;
    animation: euiModal-fade-out .3s
  }

  @-webkit-keyframes euiModal-fade-in {
    0% {
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
      opacity: 0
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1
    }
  }

  @keyframes euiModal-fade-in {
    0% {
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
      opacity: 0
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1
    }
  }

  @-webkit-keyframes euiModal-fade-out {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1
    }
    100% {
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
      opacity: 0
    }
  }

  @keyframes euiModal-fade-out {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1
    }
    100% {
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
      opacity: 0
    }
  }
</style>
