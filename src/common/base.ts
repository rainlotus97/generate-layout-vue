import { LayoutType } from "./common";

export enum ClickBtnType {
    // 新建竖型结构按钮
    VERTICAL,
    // 新建横型结构按钮
    HORIZONTAL,
    // 导出按钮
    EXPORT,
    // 预览
    PREVIEW
}

export interface ComponentType {
    id: string;
    name:string;
    version: string;
    style?:any;
    type: LayoutType;
    image: string;
    data:any;
}