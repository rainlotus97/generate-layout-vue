<template>
    <div class="main_header">
        <div v-for="(item, index) in btnList" :key="index"
            :class="activeBtn === index && activeBtn !== ClickBtnType.EXPORT ? 'active_color' : 'normal_color'"
            class="base_btn" @click="onBtnClick(index)">
            {{ item }}
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { ref } from 'vue';
import { ClickBtnType } from '../common/base.ts';

const btnList: string[] = ['新建竖型结构', '新建橫型结构', '导出数据', '预览'];
const emits = defineEmits(['btnClick']);

const activeBtn = ref<number>(0);

const onBtnClick = (index: ClickBtnType) => {
    emits('btnClick', index)
    if (index === ClickBtnType.EXPORT || index === ClickBtnType.PREVIEW) {
        return;
    }
    activeBtn.value = index;
}
</script>
    
<style scoped lang="less">
.main_header {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #232323;
}

.base_btn {
    padding: 0 10px;
    height: 30px;
    background-color: #037a7e;
    border-radius: 2px;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
}

.active_color {
    background-color: #fff;
    color: #037a7e;
}

.normal_color {
    background-color: #037a7e;
    color: #fff;
}
</style>