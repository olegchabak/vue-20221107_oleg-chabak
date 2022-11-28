<template>
  <div class="toast" :class="cssClass">
    <ui-icon class="toast__icon" :icon="icon" />
    <span>{{ message }}</span>
    <span class="toast__remove" @click="remove" />
  </div>
</template>

<script>
import UiIcon from './UiIcon';
import { types, icons, cssClasses } from '../helpers';

export default {
  name: 'UiToast',
  components: { UiIcon },
  props: {
    type: {
      type: String,
      required: true,
      validator: (prop) => types.includes(prop),
    },
    message: {
      type: String,
      required: true,
    },
  },
  emits: ['remove'],
  computed: {
    cssClass: (vm) => cssClasses[vm.type],
    icon: (vm) => icons[vm.type],
  },
  methods: {
    remove() {
      this.$emit('remove');
    },
  },
};
</script>

<style scoped>
.toast {
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

.toast .toast__remove {
  position: absolute;
  top: 4px;
  right: 4px;
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  opacity: 0;
  z-index: 1;
}

.toast:hover .toast__remove {
  opacity: 1;
  cursor: pointer;
}

.toast .toast__remove::before {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background-color: gray;
  transform: translateY(7px) rotate(-45deg);
}

.toast .toast__remove::after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background-color: gray;
  transform: translateY(6px) rotate(45deg);
}
</style>
