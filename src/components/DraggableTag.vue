如果您想要让组件停在指定的位置，可以在组件中添加一个新的属性，用于保存组件应该停留的位置。然后在拖拽结束后，将组件的位置设置为这个预定的位置。

以下是示例代码：

php
Copy code
<template>
    <div class="draggable-tag" :class="{ active: isActive }" :style="{ left: x + 'px', top: y + 'px' }" draggable="true"
        @dragstart="onDragStart" @dragend="onDragEnd" @drag="onDrag" @click="onClick">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        initialX: {
            type: Number,
            default: 0
        },
        initialY: {
            type: Number,
            default: 0
        },
        targetX: {
            type: Number,
            default: 0
        },
        targetY: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            isActive: false,
            x: this.initialX,
            y: this.initialY,
            startX: 0,
            startY: 0
        };
    },
    methods: {
        onDragStart(event) {
            this.startX = event.clientX;
            this.startY = event.clientY;
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text', '');
            this.isActive = true;
        },
        onDragEnd() {
            this.isActive = false;
            this.x = this.targetX;
            this.y = this.targetY;
        },
        onDrag(event) {
            const offsetX = event.clientX - this.startX;
            const offsetY = event.clientY - this.startY;
            this.x += offsetX;
            this.y += offsetY;
            this.startX = event.clientX;
            this.startY = event.clientY;
        },
        onClick(event) {
            event.stopPropagation();
        }
    }
};
</script>

<style>
.draggable-tag {
    position: absolute;
    cursor: move;
    padding: 5px 10px;
    border-radius: 20px;
    background-color: #409eff;
    color: #fff;
}

.draggable-tag.active {
    box-shadow: 0 0 10px #666;
}
</style>