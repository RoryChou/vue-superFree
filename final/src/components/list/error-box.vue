<template>
  <div class="error-box" v-show="isErrorComboFrom">
    <div class="tip-arrow tip-arrow-left">
      <em>◆</em>
      <i>◆</i>
    </div>
    <i class="error-icon"></i>
    <p>出发地不能为空</p>
  </div>
</template>
<script>
  export  default {
    name:'error-box'
  }
</script>
