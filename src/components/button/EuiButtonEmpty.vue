<template>
  <a
    v-if="href"
    :class="getButtonClass"
    @click="clickedButton"
    type="button">
      <span class="euiButtonEmpty__content">
        <EuiIcon
          v-if="iconName"
          :icon-name="iconName"
          :icon-title="iconTitle"
          :icon-classes="iconClass"
          :icon-size="iconSize"/>
        <span class="euiButtonEmpty__text">
          {{ title }}
        </span>
      </span>
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="getButtonClass"
    @click="clickedButton">
      <span class="euiButtonEmpty__content">
        <EuiIcon
          v-if="iconName"
          :icon-name="iconName"
          :icon-title="iconTitle"
          :icon-classes="iconClass"
          :icon-size="iconSize"/>
        <span class="euiButtonEmpty__text">
          {{ title }}
        </span>
      </span>
  </button>
</template>

<script>
    import EuiIcon from '../icon/EuiIcon';

    const colorToClassNameMap = {
        primary: 'euiButtonEmpty--primary',
        secondary: 'euiButtonEmpty--secondary',
        warning: 'euiButtonEmpty--warning',
        danger: 'euiButtonEmpty--danger',
        ghost: 'euiButtonEmpty--ghost',
        text: 'euiButtonEmpty--text',
    };

    export default {
        name: 'EuiButtonEmpty',
        components: {
            EuiIcon
        },
        data() {
            return {
                disabled: false
            }
        },
        props: {
            classes: {
                type: String,
                required: false,
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
        computed: {
            getButtonClass() {
                return `euiButtonEmpty ${this.iconName ? 'euiButtonIcon__icon' : ''} ${colorToClassNameMap[this.color]} ${this.classes}`;
            },
        },
        methods: {
            clickedButton() {
                this.$emit('click');
            },
        },
    }
</script>
