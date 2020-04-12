<template>
  <div class="euiFormRow">
    <div class="euiFormRow__labelWrapper" v-if="label">
      <label :for="id" class="euiFormLabel euiFormRow__label">{{ label }}</label>
      <div class="euiText euiText--extraSmall" v-if="helpLink">
        <a :href="helpLink" class="euiLink euiLink--primary" target="_blank">{{ helpLinkText }}</a>
      </div>
    </div>
    <div class="euiFormRow__fieldWrapper">
      <validation-provider :name="name" :rules="rules" v-slot="{ errors , classes}">
        <div class="euiFormControlLayout">
          <div class="euiFormControlLayout__childrenWrapper">
            <select
              :class="[classObject,classes]"
              :id="id"
              :name="name"
              @change="onSelectedEvent(currentOption)"
              @input="$emit('input',$event.target.value)"
              aria-label="Use aria labels when no actual label is in use"
              v-model="currentOption">
              <option :disabled="disabledLabelText"
                      v-if="defaultLabelText!=null && defaultLabelText.length>0"
                      value="">
                {{defaultLabelText}}
              </option>
              <optgroup :key="key" :label="group.label"
                        v-for="(group,key) in options"
                        v-if="grouping">
                <option :key="index"
                        :selected="value===item.value"
                        :value="item.value"
                        v-for="(item,index) in group.options">
                  {{item.label}}
                </option>
              </optgroup>
              <option :key="index" :selected="value===option.value"
                      :value="option.value"
                      v-for="(option,index) in options"
                      v-if="!grouping">
                {{option.label}}
              </option>
            </select>
            <div class="euiFormControlLayoutIcons euiFormControlLayoutIcons--right">
                <span class="euiFormControlLayoutCustomIcon">
                    <EuiIcon icon-name="down_arrow" v-if="!isLoading"/>
                </span>
            </div>
            <div class="euiFormControlLayoutIcons euiFormControlLayoutIcons--right" v-if="isLoading">
              <span class="euiLoadingSpinner euiLoadingSpinner--medium"></span>
            </div>
          </div>
        </div>
        <div aria-live="polite" class="euiFormErrorText euiFormRow__text">
          {{errors[0]}}
        </div>
      </validation-provider>
    </div>
  </div>
</template>

<script>
    import EuiIcon from './../../icon/EuiIcon';

    export default {
        name: 'EuiSelect',
        components: {
            EuiIcon,
        },
        props: {
            id: {
                type: String,
                required: false,
            },
            type: {
                type: String,
                default: 'text'
            },
            name: {
                type: String,
                required: false,
            },
            defaultSelectedValue: {
                type: String,
                required: false,
                default: ''
            },
            defaultLabelText: {
                type: String,
                default: 'Select'
            },
            disabledLabelText: {
                type: Boolean,
                default: true
            },
            grouping: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                required: false,
            },
            value: {
                type: [String, Number, Array, Boolean],
                required: false,
            },
            options: {
                type: Array,
                default: []
            },
            fullWidth: {
                type: Boolean,
                default: false
            },
            isLoading: {
                type: Boolean,
                default: false
            },
            compressed: {
                type: Boolean,
                default: false
            },
            classes: {
                type: String,
                required: false,
                default: '',
            },
            helpText: {
                type: String,
                required: false,
            },
            helpLink: {
                type: String,
                required: false,
            },
            helpLinkText: {
                type: String,
                required: false,
            },
            rules: {
                type: String,
                required: false,
            }
        },
        data() {
            return {
                currentOption: ''
            }
        },
        mounted() {
            this.currentOption = this.value;
        },
        computed: {
            classObject() {
                return `euiSelect
                ${this.fullWidth ? 'euiSelect--fullWidth' : ''}
                ${this.compressed ? 'euiSelect--compressed' : ''}
                ${this.isLoading ? 'euiSelect-isLoading' : ''}
                ${this.classes}`;
            }
        },
        methods: {
            onSelectedEvent(selected) {
                this.$emit('selected', selected)
            }
        }

    }
</script>

<style scoped>
  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    cursor: pointer;
  }
</style>
