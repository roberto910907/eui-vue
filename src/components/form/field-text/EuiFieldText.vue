<template>
  <div class="euiFormRow">
    <div class="euiFormRow__labelWrapper" v-if="label">
      <label class="euiFormLabel euiFormRow__label" :for="id">{{ label }}</label>
      <div class="euiText euiText--extraSmall" v-if="helpLink">
        <a :href="helpLink" class="euiLink euiLink--primary" target="_blank">{{ helpLinkText }}</a>
      </div>
    </div>
    <div class="euiFormRow__fieldWrapper">
      <validation-provider :name="name" :rules="rules" v-slot="{ errors , classes}">
        <div class="euiFormControlLayout">
          <div class="euiFormControlLayout__childrenWrapper">
            <input
              :class="['euiFieldText',className,classes]"
              :disabled="disabled"
              :id="id"
              :name="name"
              :placeholder="placeholder"
              :type="type"
              :value="value"
              aria-label="Use aria labels when no actual label is in use"
              v-on:input="$emit('input', $event.target.value)"
            />

            <div class="euiFormControlLayoutIcons euiFormControlLayoutIcons--right" v-if="isLoading">
              <span class="euiLoadingSpinner euiLoadingSpinner--medium"></span>
            </div>
          </div>
        </div>
        <div aria-live="polite" class="euiFormErrorText euiFormRow__text">
          {{errors[0]}}
        </div>
      </validation-provider>
      <div class="euiFormHelpText euiFormRow__text" v-if="helpText">{{ helpText }}</div>
    </div>
    <div class="euiSpacer euiSpacer--m"></div>
  </div>
</template>

<script>
    export default {
        name: 'EuiFieldText',
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
            label: {
                type: String,
                required: false,
            },
            placeholder: {
                type: String,
                required: false,
            },
            value: {
                type: [String, Number],
                required: false,
            },
            className: {
                type: String,
                required: false,
                default: '',
            },
            icon: {
                type: String,
                required: false,
            },
            disabled: {
                type: Boolean,
                required: false,
            },
            isLoading: {
                type: Boolean,
                required: false,
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
            },
        },
    }
</script>
