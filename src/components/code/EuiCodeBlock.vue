<template>
    <div :class="getCodeBlockClass()">
      <pre class="euiCodeBlock__pre">
        <code class="euiCodeBlock__code js hljs javascript" color="dark">
        <span class="hljs-string">
          {{ code }}
        </span>
        </code>
      </pre>
    </div>
</template>

<script>
    const fontSizeToClassNameMap = {
        s: 'euiCodeBlock--fontSmall',
        m: 'euiCodeBlock--fontMedium',
        l: 'euiCodeBlock--fontLarge',
    };

    const paddingSizeToClassNameMap = {
        none: '',
        s: 'euiCodeBlock--paddingSmall',
        m: 'euiCodeBlock--paddingMedium',
        l: 'euiCodeBlock--paddingLarge',
    };

    export default {
        name: 'EuiCodeBlock',
        props: {
            code: {
                required: true,
            },
            fontSize: {
                type: String,
                required: false,
                default: 'm'
            },
            paddingSize: {
                type: String,
                required: false,
                default: 'm'
            },
        },
        methods: {
            getCodeBlockClass() {
                return `euiCodeBlock ${fontSizeToClassNameMap[this.fontSize]} ${paddingSizeToClassNameMap[this.paddingSize]}`;
            },
        },
    }
</script>
