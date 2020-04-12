<template>
  <span :class="getSpinnerClass()"></span>
</template>

<script>
    const sizeToClassNameMap = {
        s: 'euiLoadingSpinner--small',
        m: 'euiLoadingSpinner--medium',
        l: 'euiLoadingSpinner--large',
        xl: 'euiLoadingSpinner--xLarge',
    };

    export default {
        name: 'EuiLoadingSpinner',
        props: {
            classes: {
                type: String,
                required: false,
            },
            size: {
                type: String,
                required: false,
                default: 'm',
            },
        },
        methods: {
            getSpinnerClass() {
                return `euiLoadingSpinner ${sizeToClassNameMap[this.size]}`;
            }
        },
    }
</script>
