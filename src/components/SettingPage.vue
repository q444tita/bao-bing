<script setup>
import { ref, watch } from 'vue';

// 定义属性
const props = defineProps({
  hostName: { type: String, required: true },
  productionSpeed: { type: Number, required: true }
});

// 本地状态，初始化为props的值
const localHostName = ref(props.hostName);
const localProductionSpeed = ref(props.productionSpeed);

// 监听props变化，同步到本地状态
watch(() => props.hostName, (newValue) => {
  localHostName.value = newValue;
});

watch(() => props.productionSpeed, (newValue) => {
  localProductionSpeed.value = newValue;
});

// 定义事件
const emit = defineEmits(['close', 'update:settings']);

// 保存设置
const saveSettings = () => {
  // 发出更新事件，传递新的设置值
  emit('update:settings', {
    hostName: localHostName.value,
    productionSpeed: localProductionSpeed.value
  });
  console.log('保存设置:', {
    hostName: localHostName.value,
    productionSpeed: localProductionSpeed.value
  });
  // 关闭设置页面
  emit('close');
};

// 关闭设置页面
const closeSettings = () => {
  emit('close');
};
</script>

<template>
  <div class="settings-overlay">
    <div class="settings-container">
      <div class="settings-header">
        <h2>系统设置</h2>
        <button class="close-btn" @click="closeSettings">
          <font-awesome-icon icon="times" />
        </button>
      </div>

      <div class="settings-content">
        <div class="setting-item">
          <label for="hostName">宿主名称:</label>
          <input
            type="text"
            id="hostName"
            v-model="localHostName"
            placeholder="输入宿主名称"
          >
        </div>

        <div class="setting-item">
          <label for="productionSpeed">生产间隔 (秒):</label>
          <input
            type="number"
            id="productionSpeed"
            v-model="localProductionSpeed"
            min="60"
            max="3600"
            step="60"
          >
          <p class="hint-text">设置死士生产土方的时间间隔，默认为1800秒(30分钟)</p>
        </div>
      </div>

      <div class="settings-footer">
        <button class="cancel-btn" @click="closeSettings">取消</button>
        <button class="save-btn" @click="saveSettings">保存设置</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.settings-container {
  background-color: #1a1a2e;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  color: #fff;
}

.settings-header {
  padding: 15px 20px;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.settings-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #ff4d4f;
}

.settings-content {
  padding: 20px;
}

.setting-item {
  margin-bottom: 20px;
}

.setting-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.setting-item input {
  width: 100%;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #2a2a40;
  color: #fff;
  font-size: 1rem;
}

.hint-text {
  margin-top: 5px;
  font-size: 0.85rem;
  color: #aaa;
}

.settings-footer {
  padding: 15px 20px;
  border-top: 1px solid #333;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn, .save-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.cancel-btn {
  background-color: #444;
  color: #fff;
}

.cancel-btn:hover {
  background-color: #555;
}

.save-btn {
  background-color: #4caf50;
  color: #fff;
}

.save-btn:hover {
  background-color: #45a049;
}

/* 设置按钮样式 */
.settings-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: rgba(26, 26, 46, 0.8);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s, transform 0.3s;
  z-index: 100;
}

.settings-btn:hover {
  background-color: rgba(26, 26, 46, 1);
  transform: scale(1.1);
}
</style>