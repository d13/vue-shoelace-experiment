<script lang="ts" setup>
// add state composition API
import { SlPopup, SlSwitch } from '@shoelace-style/shoelace';
import { ref, onMounted } from 'vue';

type Theme = 'light' | 'dark' | 'auto';

const open = ref(false);
const theme = ref<Theme>('auto');
const isDark = ref(false);
const online = ref(true);

const popupElement = ref<SlPopup | null>(null);

function togglePopup(shouldOpen = !open.value) {
  open.value = shouldOpen;
  popupElement.value!.active = open.value;
}

function setMode(selection: Theme = 'auto') {
  if (theme.value !== selection) {
    localStorage.setItem('theme', selection);
    theme.value = selection;
  }

  let prefersDark = selection === 'dark';
  if (selection === 'auto') {
    prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  isDark.value = prefersDark;

  document.documentElement.classList.toggle('sl-theme-dark', prefersDark);
}

function onHandleTrigger(e: MouseEvent | KeyboardEvent) {
  // TODO: needs to support click outside
  if ((e as KeyboardEvent).key && (e as KeyboardEvent).key !== 'Enter' && (e as KeyboardEvent).key !== ' ') {
    return;
  }

  togglePopup();
}

function onHandleOnlineChange(e: CustomEvent) {
  online.value = (e.target as SlSwitch).checked;
}

function onToggleModeClick() {
  setMode(isDark.value ? 'light' : 'dark');
}

onMounted(() => {
  setMode(localStorage.getItem('theme') as Theme);
});

// watch(
//   theme,
//   value => {
//     if (value === 'auto') {
//       const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//       document.body.classList.toggle('sl-theme-dark', isDark);
//     } else {
//       document.body.classList.toggle('sl-theme-dark', value === 'dark');
//     }
//   },
//   { immediate: true },
// );

const themeIcon = computed(() => {
  return !isDark.value ? 'moon' : 'sun';
});
const themeLabel = computed(() => {
  return !isDark.value ? 'Set Dark Mode' : 'Set Light Mode';
});
</script>

<template>
  <div class="app">
    <sl-visually-hidden>
      <a href="#global-main" class="skip-link">Skip to main content</a>
    </sl-visually-hidden>
    <sl-visually-hidden>
      <a href="#global-nav" class="skip-link">Skip to navigation</a>
    </sl-visually-hidden>
    <header class="header">
      <div class="header__group">
        <sl-tooltip content="Menu">
          <sl-icon-button name="list" label="Menu" />
        </sl-tooltip>
        <sl-tooltip content="Search">
          <sl-icon-button name="search" label="Search" />
        </sl-tooltip>
      </div>
      <div class="header__group header__group--center">My App</div>
      <div class="header__group header__group--end">
        <sl-tooltip content="Call History">
          <sl-icon-button name="clock-history" label="Call History" />
        </sl-tooltip>

        <sl-popup ref="popupElement" placement="bottom" flip shift shift-padding="10">
          <sl-avatar
            slot="anchor"
            tabindex="0"
            role="button"
            label="User avatar"
            class="avatar"
            :class="{ 'is-online': online, 'is-offline': !online }"
            @click="onHandleTrigger"
            @keydown="onHandleTrigger"
          />
          <MiPopover>
            <MiPopoverItem class="user-info">
              <template #prefix><sl-icon name="person" /></template>
              <span>
                <span>User Name</span><br />
                <small>user.name@site.com</small>
              </span>
            </MiPopoverItem>
            <MiPopoverItem>
              <sl-switch size="medium" :checked="online" @sl-change="onHandleOnlineChange">Online</sl-switch>
            </MiPopoverItem>
            <MiPopoverDivider />
            <MiPopoverItem>
              <template #prefix><sl-icon name="receipt" /></template>
              Orders
            </MiPopoverItem>
            <MiPopoverItem>
              <template #prefix><sl-icon name="heart" /></template>
              Wishlist
            </MiPopoverItem>
            <MiPopoverDivider />
            <MiPopoverItem tabindex="0" @click="onToggleModeClick">
              <template #prefix><sl-icon :name="themeIcon" /></template>
              {{ themeLabel }}
            </MiPopoverItem>
            <MiPopoverItem tabindex="0">
              <template #prefix><sl-icon name="gear" /></template>
              Settings
            </MiPopoverItem>
            <MiPopoverItem tabindex="0">
              <template #prefix><sl-icon name="box-arrow-right" /></template>
              Logout
            </MiPopoverItem>
          </MiPopover>
        </sl-popup>
      </div>
    </header>
    <main id="global-main">
      <slot />
    </main>
    <nav id="global-nav" aria-label="Main Navigation">
      <a href="/">Home</a>
      <a href="/search">Search</a>
      <a href="/cart">Cart</a>
      <a href="/calls">Calls</a>
    </nav>
  </div>
</template>

<style>
.skip-link {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--sl-panel-background-color);
  color: var(--sl-color-gray-700);
  padding: 0.5rem 1rem;
  border-radius: var(--sl-border-radius-medium);
  z-index: 100;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--sl-spacing-x-small);
}

.header__group {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: var(--sl-spacing-x-small);
}

.header__group--center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.header__group--end {
  margin-inline-start: auto;
}

.avatar {
  --size: var(--sl-font-size-2x-large);
  cursor: pointer;
  border-radius: var(--sl-border-radius-circle);
}

.avatar.is-offline {
  box-shadow: 0 0 0 2px var(--sl-color-danger-500);
}

.avatar.is-online {
  box-shadow: 0 0 0 2px var(--sl-color-success-500);
}

.user-info {
  --popover-label-line-height: var(--sl-line-height-denser);
}
</style>
