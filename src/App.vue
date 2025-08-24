<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import SettingPage from '@/components/SettingPage.vue';
import DeadWarriorPanel from '@/components/DeadWarriorPanel.vue';

// 控制死士面板显示的状态
const showWarriorPanel = ref(false);

// 切换死士面板显示状态
const toggleWarriorPanel = () => {
  showWarriorPanel.value = !showWarriorPanel.value;
};

// 控制设置页面显示的状态
const showSettings = ref(false);

// 切换设置页面显示状态
const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};

// 状态定义
const host = ref('左京');
const age = ref(18);
const level = ref(1);
const experience = ref(0);
const bone = ref(100);
const earthReserve = ref(1250);
const currentWarriors = ref(12);
const notes = ref('死士同样是血肉之躯，宿主须解决所有死士衣食住行');
const inputEarth = ref(0);
const recentLevelUp = ref(false);
const productionTimerSet = ref(1800);
const productionTimer = ref(1800); // 30分钟倒计时（秒）
const nextProduction = ref('30:00');
let productionInterval = null;

// 计算升级所需经验值：10的n次方
const requiredExp = computed(() => {
  return Math.pow(10, level.value);
});

// 计算等级进度百分比
const levelProgress = computed(() => {
  return (experience.value / requiredExp.value) * 100;
});

// 计算生产进度百分比
const productionProgress = computed(() => {
  return ((productionTimerSet.value - productionTimer.value) / productionTimerSet.value) * 100;
});

// 检查是否可以升级
const canUpgrade = computed(() => {
  return inputEarth.value > 0 && 
         inputEarth.value <= earthReserve.value;
});

// 将土方转化为经验值
const upgrade = () => {
  if (!canUpgrade.value) return;

  // 计算获得的经验值（1土方=1经验）
  const expGained = inputEarth.value;

  // 减少土方储备
  earthReserve.value -= inputEarth.value;

  // 增加经验值
  experience.value += expGained;

  // 检查是否升级
  checkLevelUp();

  // 重置输入
  inputEarth.value = 0;
};

// 检查是否满足升级条件
const checkLevelUp = () => {
  if (experience.value >= requiredExp.value) {
    // 升级
    experience.value -= requiredExp.value;
    level.value++;
    recentLevelUp.value = true;

    // 3秒后隐藏升级提示
    setTimeout(() => {
      recentLevelUp.value = false;
    }, 3000);

    // 递归检查是否还能继续升级
    checkLevelUp();
  }
};

// 生产土方
const produceEarth = () => {
  earthReserve.value += currentWarriors.value;
};

// 更新生产倒计时显示
const updateProductionTimer = () => {
  const minutes = Math.floor(productionTimer.value / 60);
  const seconds = productionTimer.value % 60;
  nextProduction.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// 监听土方储备变化，确保输入不超过上限
watch(inputEarth, (newValue) => {
  if (newValue > earthReserve.value) {
    inputEarth.value = earthReserve.value;
  }
});

// 组件挂载时启动生产计时器
onMounted(() => {
  updateProductionTimer();

  productionInterval = setInterval(() => {
    productionTimer.value--;

    if (productionTimer.value <= 0) {
      produceEarth();
      productionTimer.value = productionTimerSet.value; // 重置为30分钟
    }

    updateProductionTimer();
  }, 1000);
});

// 处理设置更新
const handleSettingsUpdate = (newSettings) => {
  // 更新宿主名称
  host.value = newSettings.hostName;

  // 更新生产间隔时间
  const newProductionSpeed = newSettings.productionSpeed;
  console.log('时间速率设置',newProductionSpeed, productionTimerSet.value);            
  if (newProductionSpeed !== productionTimerSet.value) {
    productionTimerSet.value = newProductionSpeed;
    productionTimer.value = newProductionSpeed;
    updateProductionTimer();

    // 重新设置计时器
    if (productionInterval) {
      clearInterval(productionInterval);
    }
    productionInterval = setInterval(() => {
      productionTimer.value--;

      if (productionTimer.value <= 0) {
        produceEarth();
        productionTimer.value = productionTimerSet.value;
      }

      updateProductionTimer();
    }, 1000);
  }
};

// 组件卸载时清除计时器
onUnmounted(() => {
  if (productionInterval) {
    clearInterval(productionInterval);
  }
});
</script>

<template>
  <div id="app-container">
    <div class="header">
      <h1>暴兵系统</h1>
      <p>死士管理面板 - 横推诸天</p>
    </div>

    <div class="panel-wrapper">
      <!-- 设置按钮 -->
      <button class="settings-btn" @click="toggleSettings">
        <font-awesome-icon icon="cog" size="lg" />
      </button>

      <div class="panel-container">
      <div class="decoration decoration-1"></div>
      <div class="decoration decoration-2"></div>

      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-label">
            <font-awesome-icon icon="user" /> 宿主
          </div>
          <div class="stat-value">{{ host }}</div>
        </div>

        <div class="stat-item">
          <div class="stat-label">
            <font-awesome-icon icon="birthday-cake" /> 年龄
          </div>
          <div class="stat-value">{{ age }} 岁</div>
        </div>

        <div class="stat-item">
          <div class="stat-label">
            <font-awesome-icon icon="star" /> 等级
          </div>
          <div class="stat-value">
            {{ level }} 级
            <span class="level-badge">Lv.{{ level }}</span>
          </div>
          <div class="progress-container">
            <div class="progress-bar" :style="{width: levelProgress + '%'}"></div>
          </div>
          <div style="font-size: 0.9rem; margin-top: 5px;">
            经验: {{ experience }} / {{ requiredExp }}
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-label">
            <font-awesome-icon icon="dna" /> 根骨
          </div>
          <div class="stat-value">{{ bone }}</div>
        </div>

        <div class="stat-item">
          <div class="stat-label">
            <font-awesome-icon icon="mountain" /> 土方储备
          </div>
          <div class="stat-value">{{ earthReserve }} 方</div>
          <div class="production-info">
            每名死士每30分钟生产1土方
          </div>
          <div class="progress-container">
            <div class="progress-bar" :style="{width: productionProgress + '%'}"></div>
          </div>
          <div class="production-info">
            下次生产: {{ nextProduction }}
          </div>
          <div class="upgrade-section" style="margin-top: 15px;">
            <input 
              type="number" 
              class="upgrade-input" 
              placeholder="输入要投入的土方数量" 
              v-model.number="inputEarth"
              :max="earthReserve"
              min="1"
            >
            <button class="upgrade-btn" @click="upgrade" :disabled="!canUpgrade">
              转化为经验 (1:1)
            </button>
          </div>
          <div v-if="inputEarth > 0" style="margin-top: 10px; font-size: 0.9rem;">
            投入 <span style="color: #e9b949;">{{ inputEarth }}</span> 土方可获得 
            <span style="color: #ff7b25;">{{ inputEarth }}</span> 经验值
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-label">
            <font-awesome-icon icon="users" /> 当前死士
          </div>
          <div class="stat-value warrior-link" @click="toggleWarriorPanel">
            {{ currentWarriors }} 人
            <font-awesome-icon icon="chevron-right" class="link-icon" /> 
          </div>
          <div class="production-info">
            每小时生产: {{ currentWarriors * 2 }} 土方
          </div>
        </div>
      </div>

      <div class="function-section">
        <div class="function-title">
          <font-awesome-icon icon="tools" /> 当前功能
        </div>
        <div class="function-content">
          附身
        </div>
      </div>

      <div class="notes-section">
        <div class="notes-title">
          <font-awesome-icon icon="sticky-note" /> 备注
        </div>
        <div class="notes-content">
          {{ notes }}
          <div v-if="recentLevelUp" style="margin-top: 10px; color: #e9b949;">
            <font-awesome-icon icon="arrow-up" /> 恭喜！你的等级提升到了 {{ level }} 级！
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 设置页面 -->
    <SettingPage 
      v-if="showSettings"
      :host-name="host"
      :production-speed="productionTimerSet"
      @close="toggleSettings"
      @update:settings="handleSettingsUpdate"
    />

    <!-- 死士面板 -->
    <DeadWarriorPanel
      :visible="showWarriorPanel"
      @close="toggleWarriorPanel"
    />
  </div>
</template>

<style scoped>
/* 面板包装器样式 */
.panel-wrapper {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* 死士链接样式 */
.warrior-link {
  color: #3b82f6;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.warrior-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

.link-icon {
  font-size: 0.8rem;
  transition: transform 0.2s ease;
}

.warrior-link:hover .link-icon {
  transform: translateX(2px);
}


/* 设置按钮样式 */
.settings-btn {
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: rgba(26, 26, 46, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s, transform 0.3s;
  z-index: 10;
}

.settings-btn:hover {
  background-color: rgba(26, 26, 46, 1);
  transform: scale(1.1);
}

/* 确保面板容器有足够的上边距，避免被按钮遮挡 */
.panel-container {
  margin-top: 20px;
}
</style>
