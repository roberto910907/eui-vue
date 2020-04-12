<template>
  <div>
    <div
      :class="className"
      :disabled="disabled"
      :key="index"
      @change="onChange"
      v-for="(option,index) in options">
      <EuiCheckbox
        :checked="idToSelectedMap[option.id]"
        :className="['euiCheckboxGroup__item',option.className || '']"
        :compressed="compressed"
        :disabled="option.disabled"
        :id="option.id"
        :label="option.label"
      ></EuiCheckbox>
    </div>
  </div>
</template>

<script>
    import EuiCheckbox from './EuiCheckbox';

    export default {
        name: 'EuiCheckboxGroup',
        components: {
            EuiCheckbox,
        },
        props: {
            id: {
                type: String,
                required: false
            },
            idToSelectedMap: {
                type: Object,
                default: {}
            },
            options: {
                type: Array,
                default: []
            },
            disabled: {
                type: Boolean,
                default: false
            },
            className: {
                type: String,
            }
        },
        methods: {
            onChange(optionId) {
                this.idToSelectedMap = {
                    ...this.idToSelectedMap,
                    ...{
                        [optionId]: !this.idToSelectedMap[optionId],
                    }
                };
            }
        },
    }
</script>
