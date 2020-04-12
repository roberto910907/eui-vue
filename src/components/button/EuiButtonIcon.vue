<template>
  <a
    :class="getButtonClass"
    @click="clickedButton"
    type="button"
    v-if="href">
      <span class="euiButton__content">
        <EuiIcon
          :icon-classes="iconClass"
          :icon-color="iconColor"
          :icon-name="iconName"
          :icon-size="iconSize"
          :icon-title="iconTitle"
          v-if="iconName"/>
      </span>
  </a>
  <button
    :class="getButtonClass"
    :disabled="isDisabled"
    :type="type"
    @click="clickedButton"
    v-else>
      <span class="euiButton__content">
        <EuiIcon
          :icon-classes="iconClass"
          :icon-color="iconColor"
          :icon-name="iconName"
          :icon-size="iconSize"
          :icon-title="iconTitle"
          v-if="iconName"/>
      </span>
  </button>
</template>

<script>
    import EuiIcon from '../icon/EuiIcon';

    const colorToClassNameMap = {
        primary: 'euiButtonIcon--primary',
        subdued: 'euiButtonIcon--subdued',
        success: 'euiButtonIcon--success',
        secondary: 'euiButtonIcon--secondary',
        warning: 'euiButtonIcon--warning',
        danger: 'euiButtonIcon--danger',
        disabled: 'euiButtonIcon--disabled',
        ghost: 'euiButtonIcon--ghost',
        text: 'euiButtonIcon--text',
    };

    export default {
        name: 'EuiButtonIcon',
        components: {
            EuiIcon
        },
        props: {
            classes: {
                type: String,
                required: false,
                default: '',
            },
            type: {
                type: String,
                default: 'button',
                required: false,
            },
            href: {
                type: String,
                required: false,
            },
            color: {
                type: String,
                default: 'primary',
                required: false,
            },
            size: {
                type: String,
                required: false,
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false,
            },
            iconName: {
                type: String,
                required: false,
            },
            iconTitle: {
                type: String,
                required: false,
            },
            iconClass: {
                type: String,
                required: false,
            },
            iconColor: {
                type: String,
                required: false,
            },
            iconSize: {
                type: String,
                required: false,
            },
        },
        data() {
            return {
                isDisabled: this.disabled
            }
        },
        computed: {
            getButtonClass() {
                return `euiButtonIcon ${this.iconName ? 'euiButtonIcon__icon' : ''} ${colorToClassNameMap[this.color]} ${this.classes}`;
            },
        },
        methods: {
            clickedButton() {
                this.$emit('click');
            },
        },
        watch: {
            disabled: function () {
                this.isDisabled = this.disabled;
            },
        },
    }
</script>
