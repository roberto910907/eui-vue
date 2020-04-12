<template>
  <svg
    :width="iconSize.width"
    :height="iconSize.height"
    :viewBox="`0 0 ${iconSize.width} ${iconSize.height}`"
    xmlns="http://www.w3.org/2000/svg"
    v-html="iconSvg"
    :class="getIconClass">
    <title>{{ iconTitle }}</title>
  </svg>
</template>

<script>
    const colorToClassNameMap = {
        primary: 'euiIcon--primary',
        secondary: 'euiIcon--secondary',
        success: 'euiIcon--success',
        accent: 'euiIcon--accent',
        warning: 'euiIcon--warning',
        danger: 'euiIcon--danger',
        text: 'euiIcon--text',
        subdued: 'euiIcon--subdued',
        ghost: 'euiIcon--ghost',
        shade: 'euiIcon---dark-shade'
    };

    export default {
        name: 'EuiIcon',
        props: {
            iconName: {
                type: String,
                required: true,
            },
            iconColor: {
                type: String,
                default: '',
                required: false,
            },
            iconClasses: {
                type: String,
                default: '',
                required: false,
            },
            iconSize: {
                type: Object,
                required: false,
                default: () => {
                    return {
                        width: 16,
                        height: 16,
                    };
                },
            },
            iconTitle: {
                type: String,
                required: false,
            },
        },
        data() {
            return {
                iconSvg: '',
                isLoading: true,
            }
        },
        created() {
            this.getIconSvg();
        },
        computed: {
            getIconClass() {
                return `euiIcon
                ${this.isLoading ? 'euiIcon-isLoading' : 'euiIcon-isLoaded'}
                ${this.iconClasses}
                ${this.iconColor ? colorToClassNameMap[this.iconColor] : ''}`;
            },
        },
        methods: {
            getIconSvg() {
                import('./assets/' + this.iconName + '.js')
                    .then(({icon}) => this.iconSvg = icon)
                    .then(() => this.isLoading = false);
            },
        },
    }
</script>

<style scoped>
  .euiIcon---dark-shade {
    fill: #69707D;
  }
</style>
