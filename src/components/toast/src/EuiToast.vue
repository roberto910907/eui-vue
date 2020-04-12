<template>
  <transition name="eui-notification-fade">
    <div :class="['eui-notification', getToastClass, horizontalClass]"
         v-if="visible" :style="positionStyle" @click="click">
      <p class="euiScreenReaderOnly">A new notification appears</p>
      <div class="euiToastHeader euiToastHeader--withBody" aria-label="Notification">
        <EuiIcon :icon-name="iconType" v-if="iconType"/>
        <span class="euiToastHeader__headerText">{{headerText}}</span>
      </div>
      <button type="button" class="euiToast__closeButton" aria-label="Dismiss toast"
              @click.stop="close" v-if="showClose">
        <EuiIcon icon-name="close"/>
      </button>
      <div class="euiText euiText--small euiToastBody" v-show="message">
        <slot>
          <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
          <p v-else v-html="message"></p>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
    import EuiIcon from './../../icon/EuiIcon'

    const colorToClassToastMap = {
        primary: 'euiToast--primary',
        success: 'euiToast--success',
        warning: 'euiToast--warning',
        danger: 'euiToast--danger'
    };

    export default {
        data() {
            return {
                visible: false,
                closed: false,
                showClose: true,
                dangerouslyUseHTMLString: false,
                position: 'top-right',
                iconType: 'success',
                color: 'success',
                headerText: 'Success Operation',
                message: '',
                customClass: '',
                verticalOffset: 0,
                timeOut: 4500,
                timer: null,
                onClose: null,
                onClick: null,
            };
        },
        components: {
            EuiIcon,
        },
        computed: {
            getToastClass() {
                return `euiToast ${this.color ? colorToClassToastMap[this.color] : ''} ${this.customClass}`;
            },

            horizontalClass() {
                return this.position.indexOf('right') > -1 ? 'right' : 'left';
            },

            verticalProperty() {
                return /^top-/.test(this.position) ? 'top' : 'bottom';
            },

            positionStyle() {
                return {
                    [this.verticalProperty]: `${this.verticalOffset}px`
                };
            },
        },
        watch: {
            closed(newVal) {
                if (newVal) {
                    this.visible = false;
                    this.$emit('transitionend', this.destroyElement);
                }
            },
        },
        methods: {
            destroyElement() {
                this.$emit('transitionend', this.destroyElement);
                this.$destroy();
                this.$el.parentNode.removeChild(this.$el);
            },
            click() {
                if (typeof this.onClick === 'function') {
                    this.$emit('click');
                    this.onClick();
                }
            },
            close() {
                this.closed = true;
                if (typeof this.onClose === 'function') {
                    this.$emit('close');
                    this.onClose();
                }
            },
            clearTimer() {
                clearTimeout(this.timer);
            },
            startTimer() {
                if (this.timeOut > 0) {
                    this.timer = setTimeout(() => {
                        if (!this.closed) {
                            this.close();
                        }
                    }, this.timeOut);
                }
            },
            keydown(e) {
                if (e.keyCode === 46 || e.keyCode === 8) {
                    this.clearTimer();
                } else if (e.keyCode === 27) {
                    if (!this.closed) {
                        this.close();
                    }
                } else {
                    this.startTimer();
                }
            }
        },
        mounted() {
            if (this.timeOut > 0) {
                this.timer = setTimeout(() => {
                    if (!this.closed) {
                        this.close();
                    }
                }, this.timeOut);
            }
            document.addEventListener('keydown', this.keydown);
        },
        beforeDestroy() {
            document.removeEventListener('keydown', this.keydown);
        }
    }
</script>

<style scoped>

  .eui-notification {
    width: 350px;
    padding: 14px 26px 14px 13px;
    border-radius: 5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: fixed;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    -webkit-transition: opacity .3s, left .3s, right .3s, top .4s, bottom .3s, -webkit-transform .3s;
    transition: opacity .3s, left .3s, right .3s, top .4s, bottom .3s, -webkit-transform .3s;
    transition: opacity .3s, transform .3s, left .3s, right .3s, top .4s, bottom .3s;
    transition: opacity .3s, transform .3s, left .3s, right .3s, top .4s, bottom .3s, -webkit-transform .3s;
    overflow: hidden;
  }

  .eui-notification.right {
    right: 16px
  }

  .eui-notification.left {
    left: 16px
  }

  .eui-notification-fade-enter.right {
    right: 0;
    -webkit-transform: translateX(100%);
    transform: translateX(100%)
  }

  .eui-notification-fade-enter.left {
    left: 0;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%)
  }

  .eui-notification-fade-leave-active {
    opacity: 0
  }
</style>
