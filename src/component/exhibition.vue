<template>
    <div class="main_exhibition" @click="openPanel($event, layout)">
        <div class="main_box" :style="style" :class="id === LayoutId.FLVNODE ? 'flex_vertical' : 'flex_horizontal'"
            v-if="type === LayoutType.CONTAINER && id && children.length">
            <div v-for="(item, index) in children" :key="index" @click="openPanel($event, item)"
                :class="item.type === LayoutType.COMPONENT ? 'base_comp' : 'base_layout'">
                <span style="background-color:  #037a7e;" v-if="item.type === LayoutType.COMPONENT">
                    {{ item.id }}
                </span>
                <Exhibition v-else :="item" @uniqueIdChange="onUniqueIdChange" />
            </div>
        </div>
        <div class="main_box flex_container" v-else-if="type === LayoutType.CONTAINER && id && !children.length">
            <span class="announce_title">开始新增组件</span>
        </div>
        <div class="main_box flex_container" v-else>
            <span class="announce_title">需要新建一个容器</span>
        </div>
    </div>

    <!-- 新增一个调试面板 -->
    <div class="main_panel" v-show="isOpen">
        <div class="base_comp">调试面板</div>
        <div class="close_icon" @click="closePanel">X</div>
    </div>
</template>
    
<script setup lang='ts'>
import { ref } from 'vue';
import { NodeType, LayoutType, LayoutId } from '../common/common';

const layout = defineProps<NodeType>();

const emits = defineEmits(['uniqueIdChange']);

let isOpen = ref<boolean>(false);
const docList: Set<any> = new Set();
const openPanel = (event: any, item: NodeType) => {
    event.stopPropagation();
    if (event.target && item.type === LayoutType.CONTAINER && event.target.className.includes('main_box')) {
        clearData();
        if (!docList.has(event.target)) {
            docList.add(event.target);
            event.target.style.border = '1px dashed #ff0000';
            emits('uniqueIdChange', item.uniqueId);
        }
        return;
    }
    clearData();
    console.log('openPanel', event, item);
    isOpen.value = true;
}

const clearData = () => {
    docList.forEach((doc) => {
        doc.style.border = '1px dashed #0678cf';
    });
    docList.clear();
}

const onUniqueIdChange = (uniqueId: string) => {
    emits('uniqueIdChange', uniqueId);
}

const closePanel = () => {
    isOpen.value = false;
    console.log('closePanel');
}

</script>
    
<style scoped lang="less">
.main_exhibition {
    flex: 1;
    height: 100%;
    color: #fff;
    background-color: #232323;
}

.flex_container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.main_box {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 20px;

    .announce_title {
        font-size: 30px;
        color: #fff;
    }

    .base_comp {
        padding: 10px;
        background-color: #037a7e;
        border-radius: 2px;
        text-align: center;
        line-height: 20px;
        font-size: 20px;
        color: #fff;
        max-width: 120px;
        max-height: 40px;
        cursor: pointer;
        margin-bottom: 10px;
        margin-right: 10px;
    }

    .base_layout {
        padding: 10px;
        width: 100%;
        border: 1px dashed #0678cf;
        border-radius: 2px;
        text-align: center;
        line-height: 20px;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
        margin-bottom: 10px;
    }
}

.flex_vertical {
    display: flex;
    flex-direction: column;
}

.flex_horizontal {
    display: flex;
    flex-direction: row;
}

.main_panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 96%;
    height: 96%;
    background-color: #037a7e;
    color: #fff;
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
        background-color: #037a7e;
        border-radius: 8px;
    }
}
</style>