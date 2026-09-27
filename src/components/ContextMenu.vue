<script setup>
import { onMounted, ref } from 'vue';

/**
 * ExtJS 风格右键上下文菜单。
 */
const props = defineProps({
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  items: { type: Array, default: () => [] },
});

const emit = defineEmits(['action', 'close']);

const menuEl = ref(null);

// 先按鼠标位置渲染，挂载后按菜单实际尺寸钳制到视口内，避免贴边时溢出。
const left = ref(props.x);
const top = ref(props.y);

onMounted(() => {
  const margin = 4;
  const { width, height } = menuEl.value.getBoundingClientRect();
  left.value = Math.max(margin, Math.min(props.x, window.innerWidth - width - margin));
  top.value = Math.max(margin, Math.min(props.y, window.innerHeight - height - margin));
});
</script>

<template>
  <div
    ref="menuEl"
    class="ext-menu"
    :style="{ left: `${left}px`, top: `${top}px` }"
    @mousedown.stop
  >
    <div v-for="(item, i) in items" :key="i">
      <div
        class="ext-menu-item"
        @click="
          emit('action', item.action);
          emit('close');
        "
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
