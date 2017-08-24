<template>
  <div class="error-box">
    <div class="tip-arrow" :class="arrowDirection">
      <em>◆</em>
      <i>◆</i>
    </div>
    <i class="error-icon"></i>
    <p>{{errorContent}}</p>
  </div>
</template>
<script>
  export  default {
    name:'error-box',
    props: {
      errorContent: String,
      arrowDirection:{
        type:String,
        default: 'tip-arrow-left'
      }
    }
  }
</script>
