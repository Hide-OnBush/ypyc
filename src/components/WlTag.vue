<template>
    <span class="wl-tag" :class="['wl-tag--' + type, { 'is-hit': hit }]" @click="handleClick">
        <slot></slot>
    </span>
</template>
  
<script lang="ts">
export default {
    name: 'WlTag',
    props: {
        type: {
            type: String,
            default: 'primary',
            validator: function (value) {
                return ['primary', 'success', 'warning', 'danger', 'info'].indexOf(value) !== -1;
            }
        },
        hit: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick(event) {
            this.$emit('click', event);
        }
    }
};
</script>
  
<style>
.wl-tag {
    display: inline-block;
    padding: 0 12px;
    margin-right: 15px;
    margin-bottom: 20px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
    transition: .2s;
    color: inherit;
}

.wl-tag--primary {
    background-color: #409EFF;
}

.wl-tag--primary.is-hit {
    color: #409EFF;
    background-color: #fff;
    border: 1px solid #409EFF;
}

.wl-tag--success {
    background-color: #67C23A;
}

.wl-tag--success.is-hit {
    color: #67C23A;
    background-color: #fff;
    border: 1px solid #67C23A;
}

.wl-tag--warning {
    background-color: #E6A23C;
}

.wl-tag--warning.is-hit {
    color: #E6A23C;
    background-color: #fff;
    border: 1px solid #E6A23C;
}

.wl-tag--danger {
    background-color: #F56C6C;
}

.wl-tag--danger.is-hit {
    color: #F56C6C;
    background-color: #fff;
    border: 1px solid #F56C6C;
}

.wl-tag--info {
    background-color: #909399;
}

.wl-tag--info.is-hit {
    color: #909399;
    background-color: #fff;
    border: 1px solid #909399;
}
</style>