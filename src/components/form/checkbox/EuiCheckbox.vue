<template>
  <div>
    <div :class="classObject">
      <input :checked="checked" :disabled="disabled"
             :id="id"
             :type="type"
             @change="indeterminate ? onChange : onChangeIndeterminate"
             class='euiCheckbox__input'>
      <div class="euiCheckbox__square"></div>
      <label :for="id" class="euiCheckbox__label" v-if="label">{{label}}</label>
    </div>
    <div class="euiSpacer euiSpacer--m"></div>
  </div>
</template>

<script>
    export default {
        name: "EuiCheckbox",
        props: {
            id: {
                type: String,
                required: true
            },
            label: {
                type: String,
            },
            type: {
                type: String,
                default: 'checkbox'
            },
            checked: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            indeterminate: {
                type: Boolean,
                default: false
            },
            compressed: {
                type: Boolean,
                default: false
            },
            className: {
                type: String,
            }
        },
        computed: {
            classObject() {
                return `euiCheckbox
                ${!this.label ? 'euiCheckbox--noLabel' : ''}
                ${this.compressed ? 'euiCheckbox--compressed' : ''}
                ${this.className}`;
            }
        },
        methods: {
            onChange(e) {
                this.checked = e.target.checked;
                this.$emit('checked', e.target.checked)
            },
            onChangeIndeterminate() {
                this.indeterminate = !this.indeterminate;
            }
        }
    }
</script>
