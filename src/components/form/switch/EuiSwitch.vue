<template>
  <div class="euiSwitch">
    <button
      :aria-checked="isCheckedAttr"
      :disabled="disabled"
      @click="switchChanged"
      class="euiSwitch__button"
      type="button">
      <span :class="getSwitchBodyClass()">
        <span class="euiSwitch__thumb"></span>
        <span class="euiSwitch__track">
          <EuiIcon icon-name="cross" icon-classes="euiSwitch__icon" v-if="showIcons"></EuiIcon>
          <EuiIcon icon-name="check" icon-classes="euiSwitch__icon euiSwitch__icon--checked" v-if="showIcons"></EuiIcon>
        </span>
      </span>
    </button>
    <span class="euiSwitch__label" v-if="showLabel">{{ label }}</span>
  </div>
</template>

<script>
    import EuiIcon from './../../icon/EuiIcon';

    const colorToClassSwitchMap = {
        primary: 'euiSwitch--primary',
        success: 'euiSwitch--success',
        warning: 'euiSwitch--warning',
        danger: 'euiSwitch--danger'
    };

    export default {
        name: 'EuiSwitch',
        components: {
            EuiIcon,
        },
        model: {
            prop: 'checked',
            event: 'input'
        },
        props: {
            label: {
                type: String,
                required: false,
            },
            showLabel: {
                type: Boolean,
                required: false,
                default: true,
            },
            disabled: {
                type: Boolean,
                required: false,
            },
            checked: {
                type: Boolean,
                required: false,
            },
            color: {
                type: String,
                required: false,
                default: 'primary',
            },
            showIcons: {
                type: Boolean,
                required: false,
                default: true,
            },
        },
        data() {
            return {
                isChecked: this.checked
            }
        },
        computed: {
            isCheckedAttr() {
                return `${this.isChecked}`;
            },
        },
        methods: {
            getSwitchBodyClass() {
                return `euiSwitch__body ${colorToClassSwitchMap[this.color]}`;
            },
            switchChanged() {
                this.isChecked = !this.isChecked;

                this.$emit('input', this.isChecked);
            },
        }
    }
</script>

<style scoped>
  .euiSwitch--primary {
    background-color: #006BB4;
  }

  .euiSwitch--success {
    background-color: #017D73;
  }

  .euiSwitch--warning {
    background-color: #F5A700;
  }

  .euiSwitch--danger {
    background-color: #BD271E;
  }
</style>
