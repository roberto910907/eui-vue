<template>
  <div>
    <div role="tablist" class="euiTabs">
      <button
        v-for="(tab, index) in tabList"
        :key="index" role="tab" type="button"
        :class="getTabClass(index)"
        @click="updateSelectedTab(index)">
        <span class="euiTab__content">{{ tab.name }}</span>
      </button>
    </div>
    <div class="euiSpacer euiSpacer--l"></div>
  </div>
</template>

<script>
    export default {
        props: {
            tabList: {
                type: Array,
                required: true,
            }
        },
        data() {
            return {
                tabSelectedIndex: 0,
            }
        },
        methods: {
            getTabClass(tabIndex) {
                return 'euiTab ' + (tabIndex === this.tabSelectedIndex ? 'euiTab-isSelected' : '');
            },
            updateSelectedTab(tabIndex) {
                this.tabSelectedIndex = tabIndex;
            },
        },
    }
</script>
