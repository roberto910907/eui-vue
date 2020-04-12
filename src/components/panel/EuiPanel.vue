<template>
  <div class="euiPanel euiPanel--paddingLarge euiPageContent">
    <div class="euiPageContentHeader euiPageContentHeader--responsive">
      <div class="euiPageContentHeaderSection">
        <h2 class="euiTitle euiTitle--medium">
          <slot name="title"></slot>
        </h2>
      </div>
    </div>
    <div class="euiPageContentBody">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'EuiPanel'
    }
</script>
