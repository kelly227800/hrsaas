<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <TreeTools :treeNode="company" :isRoot="true"/>
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <!-- 作用域插槽 -->
          <!-- v-slot 获取组件内部slot提供的数据 -->
          <template v-slot="{ data }">
            <TreeTools :treeNode="data"/>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools.vue";
import {getDeptsApi} from '@/api/department.js'
import { transListToTree } from '@/utils/index'
export default {
  data() {
    return {
      defaultProps: {
        label: "name",
      },
      treeData: [
        { name: "总裁办", children: [{ name: "董事会" }] },
        { name: "行政部" },
        { name: "人事部" },
      ],
      company: { name: "传智教育", manager: "负责人" },
    };
  },
  components: {
    TreeTools,
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      const res = await getDeptsApi()
      console.log(res)
      this.treeData = res.depts
      this.treeData = transListToTree(this.treeData, '')
    }
  },
};
</script>

<style scoped lang="less"></style>
