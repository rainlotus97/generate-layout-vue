<template>
    <div class="main_section">
        <div v-for="(item, index) in componentList" :key="index" class="base_comp" @click="onComponentClick(item)">
            {{ item.name }}
        </div>

    </div>
</template>
    
<script setup lang='ts'>
import { ref } from 'vue';
import { ComponentType } from '../common/base.ts';
import { LayoutType, NodeType } from '../common/common';
const componentList = ref<ComponentType[]>([
    {
        type: LayoutType.COMPONENT,
        name: '图片卡',
        id: 'ImageCard',
        version: '1.0.0',
        image: '',
        data: {
            "src": "https://p3-passport.byteacctimg.com/img/user-avatar/49c8f53ae251055fa531abf6356fb553~80x80.awebp"
        }
    },
    { type: LayoutType.COMPONENT, 
        name: '文字卡', 
        id: 'TitleCard', 
        version: '1.0.0', 
        image: '', 
        data: { title: '这是文字卡' } },
    { type: LayoutType.CONTAINER, 
        name: '竖型容器', 
        id: 'flvnode', 
        version: '1.0.0', 
        image: '', 
        data: {} },
    { type: LayoutType.CONTAINER, 
        name: '橫型容器', 
        id: 'flhnode', 
        version: '1.0.0', 
        image: '', 
        data: {} },
]);
const emits = defineEmits(['componentClick']);
const onComponentClick = (item: ComponentType) => {
    const nodeData: NodeType = {
        id: item.id,
        type: item.type,
        style: item.style,
        children: [],
        data: item.data,
        uniqueId: new Date().getTime().toString()
    }
    emits('componentClick', nodeData)
}
</script>
    
<style scoped lang="less">
.main_section {
    min-width: 200px;
    width: 200px;
    height: 100%;
    overflow: auto;
    color: #fff;
    padding: 20px;
    border-right: 1px solid #e5e5e5;
    background-color: #232323;

    .base_comp {
        padding: 10px;
        background-color: #037a7e;
        border-radius: 2px;
        text-align: center;
        line-height: 30px;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
        margin-bottom: 10px;
    }
}
</style>