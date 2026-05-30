<template>
  <section id="skills" class="section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-label">Навыки</span>
        <h2 class="section-title">Технический стек</h2>
      </div>
      <div class="skills-grid">
        <div v-for="skill in store.skills" :key="skill.name" class="skill-card">
          <div class="skill-icon">{{ skill.icon }}</div>
          <h3 class="skill-name">{{ skill.name }}</h3>
          <div class="skill-level">{{ skill.level }}</div>
          <p class="skill-description">{{ skill.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'

const store = useProfileStore()
</script>

<style lang="scss" scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.skill-card {
  background: $secondary-bg;
  border: 1px solid $border;
  border-radius: $radius-md;
  padding: 24px;
  transition: all $transition;

  &:hover {
    border-color: $accent;
    transform: translateY(-4px);
    box-shadow: $shadow;
  }
}

.skill-icon {
  font-size: 32px;
  margin-bottom: 16px;
}

.skill-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.skill-level {
  font-size: 13px;
  color: $accent;
  margin-bottom: 12px;
  font-weight: 500;
}

.skill-description {
  font-size: 14px;
  color: $text-secondary;
  line-height: 1.6;
}
</style>