<script setup lang="ts">
import { ClickBtnType } from './common/base';
import Header from './component/header.vue';
import Section from './component/section.vue';
import Exhibition from './component/exhibition.vue';
import { LayoutId, LayoutType, NodeType } from './common/common';
import { ref } from 'vue';

const mainExportData = ref<NodeType>({
  id: LayoutId.FLVNODE,
  type: LayoutType.CONTAINER,
  children: [],
  style: {},
  data: {},
  uniqueId: new Date().getTime().toString()
});

let currentUniqueId: string = mainExportData.value.uniqueId;

const onBtnClick = (type: ClickBtnType) => {
  if (type === ClickBtnType.VERTICAL) {
    onGenerateVertical();
  } else if (type === ClickBtnType.HORIZONTAL) {
    onGenerateHorizontal();
  } else if (type === ClickBtnType.EXPORT) {
    onExport();
  } else if (type === ClickBtnType.PREVIEW) {
    onPreview();
  }
};

const onPreview = () => {
  isPreview.value = true;
  console.log('onPreview');
};

const onGenerateVertical = () => {
  mainExportData.value.id = LayoutId.FLVNODE;
  mainExportData.value.children = [];
  mainExportData.value.style = undefined;
  mainExportData.value.data = {};
  mainExportData.value.uniqueId = new Date().getTime().toString();
  currentUniqueId = mainExportData.value.uniqueId;
  console.log('onGenerateVertical');
};

const onGenerateHorizontal = () => {
  mainExportData.value.id = LayoutId.FLHNODE;
  mainExportData.value.children = [];
  mainExportData.value.style = undefined;
  mainExportData.value.data = {};
  mainExportData.value.uniqueId = new Date().getTime().toString();
  currentUniqueId = mainExportData.value.uniqueId;
  console.log('onGenerateHorizontal');
};

const onExport = () => {
  console.log('onExport', JSON.stringify(mainExportData.value));
};

const onComponentClick = (nodeData: NodeType) => {
  const parent: NodeType | null = findNodeByUniqueId(mainExportData.value, currentUniqueId);
  if (!parent) {
    return;
  }
  parent.children.push(nodeData);
  console.log('onComponentClick', nodeData);
};

const onUniqueIdChange = (uniqueId: string) => {
  currentUniqueId = uniqueId;
  console.log('onUniqueIdChange', uniqueId);
};
const findNodeByUniqueId = (root: NodeType, uniqueId: string): NodeType | null => {
  // 如果当前节点的 uniqueId 匹配，则返回当前节点
  if (root.uniqueId === uniqueId) {
    return root;
  }

  // 否则在子节点中递归查找
  for (const child of root.children) {
    const result = findNodeByUniqueId(child, uniqueId);
    if (result) {
      return result;
    }
  }

  // 如果未找到匹配的节点，则返回 null
  return null;
}

const isPreview = ref<boolean>(false);

const closePanel = () => {
  isPreview.value = false;
  console.log('closePanel');
};
</script>

<template>
  <Header @btn-click="onBtnClick" />
  <div class="main_show">
    <Section @component-click="onComponentClick" />
    <Exhibition :="mainExportData" @uniqueIdChange="onUniqueIdChange" />
  </div>

  <!-- 新增一个预览界面 -->
  <div class="main_preview" v-if="isPreview">
    <dynamic-node :data="mainExportData" />
    <div class="close_icon" @click="closePanel">X</div>
  </div>
</template>

<style scoped lang="less">
.main_show {
  display: flex;
  justify-content: start;
  align-items: center;
  overflow: hidden;
  height: calc(100vh - 50px);
}

.main_preview {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 96%;
  height: 96%;
  background-color: #fff;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  border-radius: 8px;

  .close_icon {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    background-color: #fff;
    border-radius: 8px;
    color: #333;
  }
}
  // 隐藏滚动条
  ::-webkit-scrollbar {
    display: none;
  }
</style>
