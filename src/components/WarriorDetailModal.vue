<script setup>
import { ref } from 'vue';

// 定义属性
const props = defineProps({
  visible: { type: Boolean, required: true },
  warrior: { type: Object, required: true }
});

// 定义事件
const emit = defineEmits(['close']);

// 关闭模态框
const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h3>{{ warrior.name }} - 死士详情</h3>
        <button class="close-btn" @click="closeModal">×</button>
      </div>
      <div class="modal-content">
        <div class="warrior-info">
          <div class="info-item">
            <span class="label">称谓:</span>
            <span class="value">{{ warrior.rank }}</span>
          </div>
          <div class="info-item">
            <span class="label">等级:</span>
            <span class="value">{{ warrior.level }}</span>
          </div>
          <div class="info-item">
            <span class="label">年龄:</span>
            <span class="value">{{ warrior.age }} 岁</span>
          </div>
          <div class="divider"></div>
          <h4>身体素质</h4>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="label">力量:</span>
              <div class="stat-bar">
                <div class="bar" :style="{ width: warrior.strength + '%' }"></div>
                <span class="value">{{ warrior.strength }}</span>
              </div>
            </div>
            <div class="stat-item">
              <span class="label">敏捷:</span>
              <div class="stat-bar">
                <div class="bar" :style="{ width: warrior.agility + '%' }"></div>
                <span class="value">{{ warrior.agility }}</span>
              </div>
            </div>
            <div class="stat-item">
              <span class="label">耐力:</span>
              <div class="stat-bar">
                <div class="bar" :style="{ width: warrior.endurance + '%' }"></div>
                <span class="value">{{ warrior.endurance }}</span>
              </div>
            </div>
            <div class="stat-item">
              <span class="label">智力:</span>
              <div class="stat-bar">
                <div class="bar" :style="{ width: warrior.intelligence + '%' }"></div>
                <span class="value">{{ warrior.intelligence }}</span>
              </div>
            </div>
            <div class="stat-item">
              <span class="label">意志力:</span>
              <div class="stat-bar">
                <div class="bar" :style="{ width: warrior.willpower + '%' }"></div>
                <span class="value">{{ warrior.willpower }}</span>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <h4>技能</h4>
          <div class="skills-list">
            <div v-for="skill in warrior.skills" :key="skill.id" class="skill-item">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-description">{{ skill.description }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="confirm-btn" @click="closeModal">关闭</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex; justify-content: center; align-items: center;
  z-index: 2000;
}

.modal-container {
  background-color: #1e293b; border-radius: 8px;
  width: 90%; max-width: 600px; max-height: 80vh;
  overflow: hidden; display: flex; flex-direction: column;
}

.modal-header {
  padding: 16px; background-color: #0f172a; color: white;
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid #334155;
}

.modal-header h3 {
  margin: 0; font-size: 1.25rem;
}

.close-btn {
  background: none; border: none; color: white; font-size: 1.5rem;
  cursor: pointer; padding: 0 10px;
}

.modal-content {
  padding: 16px; overflow-y: auto; flex-grow: 1;
  color: #e2e8f0;
}

.warrior-info {
  display: flex; flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex; justify-content: space-between;
  padding: 8px 0;
}

.label {
  color: #94a3b8; font-weight: 500;
}

.value {
  font-weight: bold;
}

.divider {
  height: 1px; background-color: #334155;
  margin: 8px 0;
}

h4 {
  margin: 12px 0 8px 0; font-size: 1.1rem;
  color: #f8fafc;
}

.stats-grid {
  display: grid; grid-template-columns: 1fr;
  gap: 12px;
}

.stat-item {
  display: flex; flex-direction: column; gap: 4px;
}

.stat-bar {
  display: flex; align-items: center; gap: 8px;
  height: 20px; background-color: #334155;
  border-radius: 4px; padding: 2px;
}

.bar {
  background-color: #3b82f6; height: 100%;
  border-radius: 2px; transition: width 0.3s ease;
}

.skills-list {
  display: flex; flex-direction: column; gap: 8px;
}

.skill-item {
  background-color: #334155; padding: 10px;
  border-radius: 4px;
}

.skill-name {
  font-weight: bold; color: #3b82f6;
  display: block; margin-bottom: 4px;
}

.skill-description {
  font-size: 0.9rem; color: #cbd5e1;
}

.modal-footer {
  padding: 16px; background-color: #0f172a;
  display: flex; justify-content: flex-end;
  border-top: 1px solid #334155;
}

.confirm-btn {
  background-color: #3b82f6; color: white; border: none;
  border-radius: 4px; padding: 8px 16px; cursor: pointer;
  font-size: 1rem;
}

.confirm-btn:hover {
  background-color: #2563eb;
}
</style>