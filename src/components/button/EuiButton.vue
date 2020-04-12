<template>
  <a
    :class="getButtonClass"
    @click="clickedButton"
    type="button"
    v-if="href">
      <span class="euiButton__content">
        <EuiLoadingSpinner v-if="isLoading"></EuiLoadingSpinner>
        <EuiIcon
          :icon-classes="iconClass"
          :icon-color="iconColor"
          :icon-name="iconName"
          :icon-size="iconSize"
          :icon-title="iconTitle"
          v-else-if="iconName"/>
        <span class="euiButton__text">
          {{ title }}
        </span>
      </span>
  </a>
  <button
    :class="getButtonClass"
    :disabled="isDisabled"
    :type="type"
    @click="clickedButton"
    v-else>
      <span class="euiButton__content">
        <EuiLoadingSpinner v-if="isLoading"></EuiLoadingSpinner>
        <EuiIcon
          :icon-classes="iconClass"
          :icon-color="iconColor"
          :icon-name="iconName"
          :icon-size="iconSize"
          :icon-title="iconTitle"
          v-else-if="iconName"/>
        <span class="euiButton__text">
          {{ title }}
        </span>
      </span>
  </button>
</template>

<script>
    import EuiIcon from '../icon/EuiIcon';
    import EuiLoadingSpinner from '../loading/EuiLoadingSpinner';

    const colorToClassNameMap = {
        primary: 'euiButton--primary',
        secondary: 'euiButton--secondary',
        warning: 'euiButton--warning',
        danger: 'euiButton--danger',
        ghost: 'euiButton--ghost',
        text: 'euiButton--text',
    };

    export default {
        name: 'EuiButton',
        components: {
            EuiIcon,
            EuiLoadingSpinner
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
            title: {
                type: String,
                required: false,
            },
            fill: {
                type: Boolean,
                default: true,
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
            isLoading: {
                type: Boolean,
                required: false,
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
                return `euiButton ${this.fill ? 'euiButton--fill' : ''} ${this.iconName ? 'euiButtonIcon__icon' : ''} ${colorToClassNameMap[this.color]} ${this.classes}`;
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
            isLoading: function () {
                // if is loading we disable the button, otherwise we check the original prop
                this.isDisabled = this.isLoading ? true : this.disabled;
            }
        },
    }
</script>
