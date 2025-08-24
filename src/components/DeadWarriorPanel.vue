<script setup>
import { ref } from 'vue';
import WarriorDetailModal from '@/components/WarriorDetailModal.vue';

// 标签页状态
const activeTab = ref('summary');

// 选中的死士
const selectedWarrior = ref(null);
const showDetailModal = ref(false);

// 打开死士详情
const openWarriorDetail = (warrior) => {
  selectedWarrior.value = warrior;
  showDetailModal.value = true;
};

// 关闭死士详情
const closeWarriorDetail = () => {
  showDetailModal.value = false;
  selectedWarrior.value = null;
};

// 死士详细数据
const warriors = ref([
  { id: 1, name: '张三', rank: '卒', level: 1, age: 25,
    strength: 70, agility: 65, endurance: 75, intelligence: 50, willpower: 80,
    skills: [
      { id: 1, name: '基础刀法', description: '掌握基础的刀法技巧，攻击力+10' },
      { id: 2, name: '快速移动', description: '短距离冲刺，提高闪避率' }
    ]
  },
  { id: 2, name: '李四', rank: '卒', level: 1, age: 22,
    strength: 65, agility: 75, endurance: 60, intelligence: 55, willpower: 70,
    skills: [
      { id: 1, name: '基础剑法', description: '掌握基础的剑法技巧，攻击力+10' },
      { id: 2, name: '精准投掷', description: '提高投掷武器的命中率' }
    ]
  },
  { id: 3, name: '王五', rank: '卒', level: 1, age: 28,
    strength: 80, agility: 55, endurance: 85, intelligence: 45, willpower: 75,
    skills: [
      { id: 1, name: '基础拳法', description: '掌握基础的拳法技巧，攻击力+10' },
      { id: 2, name: '铁布衫', description: '提高防御力，减少受到的伤害' }
    ]
  },
  { id: 4, name: '赵六', rank: '伍长', level: 2, age: 30,
    strength: 75, agility: 70, endurance: 80, intelligence: 65, willpower: 85,
    skills: [
      { id: 1, name: '中级刀法', description: '掌握中级的刀法技巧，攻击力+20' },
      { id: 2, name: '小队指挥', description: '提高附近队友的战斗力' },
      { id: 3, name: '战术部署', description: '能够制定基础的战斗策略' }
    ]
  },
  { id: 5, name: '钱七', rank: '伍长', level: 2, age: 32,
    strength: 70, agility: 80, endurance: 75, intelligence: 70, willpower: 80,
    skills: [
      { id: 1, name: '中级剑法', description: '掌握中级的剑法技巧，攻击力+20' },
      { id: 2, name: '快速反应', description: '提高对敌人攻击的反应速度' },
      { id: 3, name: '侦查', description: '能够发现隐藏的敌人' }
    ]
  },
  { id: 6, name: '孙八', rank: '什长', level: 3, age: 35,
    strength: 80, agility: 75, endurance: 85, intelligence: 75, willpower: 90,
    skills: [
      { id: 1, name: '高级刀法', description: '掌握高级的刀法技巧，攻击力+30' },
      { id: 2, name: '战术指挥', description: '提高团队的战斗效率' },
      { id: 3, name: '鼓舞士气', description: '提高队友的攻击力和防御力' },
      { id: 4, name: '战场分析', description: '能够分析战场形势并做出应对' }
    ]
  },
  { id: 7, name: '周九', rank: '百夫长', level: 4, age: 40,
    strength: 85, agility: 80, endurance: 90, intelligence: 85, willpower: 95,
    skills: [
      { id: 1, name: '专家刀法', description: '掌握专家级的刀法技巧，攻击力+40' },
      { id: 2, name: '军队指挥', description: '能够指挥大规模的战斗' },
      { id: 3, name: '战略部署', description: '能够制定复杂的战斗策略' },
      { id: 4, name: '战场洞察', description: '能够预测敌人的行动' },
      { id: 5, name: '领导魅力', description: '极大提高队友的战斗力和士气' }
    ]
  },
  { id: 8, name: '吴十', rank: '千夫长', level: 5, age: 45,
    strength: 90, agility: 85, endurance: 95, intelligence: 90, willpower: 100,
    skills: [
      { id: 1, name: '大师刀法', description: '掌握大师级的刀法技巧，攻击力+50' },
      { id: 2, name: '统帅全军', description: '能够指挥整个军队的战斗' },
      { id: 3, name: '战略规划', description: '能够制定长期的战斗计划' },
      { id: 4, name: '神级洞察', description: '能够完全预测敌人的行动' },
      { id: 5, name: '王者之气', description: '极大提高所有队友的战斗力和士气' },
      { id: 6, name: '战无不胜', description: '在战斗中获得额外的优势' }
    ]
  }
]);

// 按等级分组死士
const warriorsByLevel = ref({
  1: warriors.value.filter(w => w.level === 1),
  2: warriors.value.filter(w => w.level === 2),
  3: warriors.value.filter(w => w.level === 3),
  4: warriors.value.filter(w => w.level === 4),
  5: warriors.value.filter(w => w.level === 5)
});

// 定义属性
const props = defineProps({
  visible: { type: Boolean, required: true }
});

// 定义事件
const emit = defineEmits(['close']);

// 死士等级数据
const warriorLevels = ref([
  { level: 1, name: '卒', count: warriorsByLevel.value[1].length, chance: 60, cost: 10, skill: '基础作战' },
  { level: 2, name: '伍长', count: warriorsByLevel.value[2].length, chance: 25, cost: 50, skill: '小队指挥' },
  { level: 3, name: '什长', count: warriorsByLevel.value[3].length, chance: 10, cost: 100, skill: '战术部署' },
  { level: 4, name: '百夫长', count: warriorsByLevel.value[4].length, chance: 4, cost: 500, skill: '战场洞察' },
  { level: 5, name: '千夫长', count: warriorsByLevel.value[5].length, chance: 1, cost: 1000, skill: '统帅全军' }
]);

// 计算总死士数量
const totalWarriors = ref(0);

// 计算总死士数量
for (const level of warriorLevels.value) {
  totalWarriors.value += level.count;
}

// 关闭面板
const closePanel = () => {
  emit('close');
};
</script>

<template>
  <div v-if="visible" class="warrior-panel-overlay">
    <div class="warrior-panel-container">
      <div class="warrior-panel-header">
        <h2>死士</h2>
        <button class="close-btn" @click="closePanel">×</button>
      </div>
      <div class="warrior-panel-content">
        <!-- 标签页导航 -->
        <div class="tabs">
          <button 
            class="tab-button" 
            :class="{ 'active': activeTab === 'summary' }"
            @click="activeTab = 'summary'"
          >
            死士概览
          </button>
          <button 
            class="tab-button"
            :class="{ 'active': activeTab === 'details' }"
            @click="activeTab = 'details'"
          >
            死士详情
          </button>
        </div>

        <!-- 标签页内容 -->
        <div class="tab-content">
          <!-- 概览标签页 -->
          <div v-if="activeTab === 'summary'" class="summary-tab">
            <div class="total-warriors">
              <p>总死士数量: <span class="highlight">{{ totalWarriors }}</span></p>
            </div>
            <div class="warrior-levels">
              <table class="warrior-table">
                <thead>
                  <tr>
                    <th>等级</th>
                    <th>称谓</th>
                    <th>数量</th>
                    <th>召唤几率</th>
                    <th>消耗土方</th>
                    <th>技能</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="warrior in warriorLevels" :key="warrior.level">
                    <td>{{ warrior.level }}</td>
                    <td>{{ warrior.name }}</td>
                    <td>{{ warrior.count }}</td>
                    <td>{{ warrior.chance }}%</td>
                    <td>{{ warrior.cost }}</td>
                    <td>{{ warrior.skill }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 详情标签页 -->
          <div v-else-if="activeTab === 'details'" class="details-tab">
            <div v-for="(levelWarriors, level) in warriorsByLevel" :key="level" class="level-group">
              <h3>等级 {{ level }} - {{ ((warriorLevels && warriorLevels.find(wl => wl.level === parseInt(level))) || { name: '未知' }).name || '未知' }}</h3>
              <div class="warriors-grid">
                <div v-for="warrior in levelWarriors.slice(0, 10)" :key="warrior.id" class="warrior-card">
                  <div class="warrior-name" @click="openWarriorDetail(warrior)">
                    {{ warrior.name }}
                    <font-awesome-icon icon="chevron-right" class="link-icon" />
                  </div>
                  <div class="warrior-info">
                    <p>年龄: {{ warrior.age }}岁</p>
                    <p>等级: {{ warrior.level }}</p>
                    <p>称谓: {{ warrior.rank }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 死士详情模态框 -->
      <WarriorDetailModal
  v-if="showDetailModal"
  :visible="true"
  :warrior="selectedWarrior"
  @close="closeWarriorDetail"
/>
      <div class="warrior-panel-footer">
        <button class="confirm-btn" @click="closePanel">确认</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.warrior-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.warrior-panel-container {
  background-color: #1e293b;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.warrior-panel-header {
  padding: 16px;
  background-color: #0f172a;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #334155;
}

.warrior-panel-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 10px;
}

.warrior-panel-content {
  padding: 16px;
  overflow-y: auto;
  flex-grow: 1;
  color: #e2e8f0;
}

.total-warriors {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #334155;
}

.highlight {
  color: #3b82f6;
  font-weight: bold;
}

.warrior-table {
  width: 100%;
  border-collapse: collapse;
}

.warrior-table th,
.warrior-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #334155;
}

.warrior-table th {
  background-color: #0f172a;
  font-weight: bold;
}

.warrior-table tr:hover {
  background-color: #334155;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #334155;
  margin-bottom: 16px;
}

.tab-button {
  padding: 10px 16px;
  background-color: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.tab-button.active {
  color: #3b82f6;
  border-bottom: 2px solid #3b82f6;
}

.tab-button:hover:not(.active) {
  color: #e2e8f0;
}

.tab-content {
  min-height: 300px;
}

.summary-tab,
.details-tab {
  padding: 8px 0;
}

.level-group {
  margin-bottom: 24px;
}

.level-group h3 {
  margin-bottom: 12px;
  color: #f8fafc;
  font-size: 1.2rem;
}

.warriors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.warrior-card {
  background-color: #334155;
  border-radius: 6px;
  padding: 12px;
  transition: transform 0.2s ease;
}

.warrior-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.warrior-name {
  color: #3b82f6;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.link-icon {
  font-size: 0.8rem;
  transition: transform 0.2s ease;
}

.warrior-name:hover .link-icon {
  transform: translateX(2px);
}

.warrior-info {
  color: #e2e8f0;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.warrior-panel-footer {
  padding: 16px;
  background-color: #0f172a;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #334155;
}

.confirm-btn {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 1rem;
}

.confirm-btn:hover {
  background-color: #2563eb;
}
</style>