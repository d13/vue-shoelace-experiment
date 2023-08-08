<template>
  <div class="popover-item" role="button">
    <span v-if="$slots.prefix" class="popover-item__prefix"><slot name="prefix" /></span>
    <span class="popover-item__label"><slot /></span>
    <span v-if="$slots.suffix" class="popover-item__suffix"><slot name="suffix" /></span>
  </div>
</template>

<style>
.popover-item {
  position: relative;
  display: flex;
  align-items: stretch;
  font-family: var(--sl-font-sans);
  font-size: var(--sl-font-size-medium);
  font-weight: var(--sl-font-weight-normal);
  line-height: var(--sl-line-height-normal);
  letter-spacing: var(--sl-letter-spacing-normal);
  color: var(--sl-color-neutral-700);
  padding: var(--sl-spacing-2x-small) var(--sl-spacing-small);
  transition: var(--sl-transition-fast) fill;
  user-select: none;
  white-space: nowrap;
  gap: var(--sl-spacing-x-small);
}

.popover-item[tabindex]:not([tabindex='-1']):hover {
  background-color: var(--sl-color-neutral-100);
  color: var(--sl-color-neutral-1000);
}

.popover-item[tabindex]:not([tabindex='-1']) {
  cursor: pointer;
}

.popover-item__label {
  flex: 1 1 auto;
  display: inline-block;
  line-height: var(--popover-label-line-height, var(--sl-line-height-normal));
}

.popover-item__prefix {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}

.popover-item__suffix {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}
</style>
