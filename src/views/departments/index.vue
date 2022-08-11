<template>
  <div class="dashboard-container">
    <div class="app-container" v-loading="loading">
      <add-dept
        :visible.sync="addDialogVisible"
        :currentNode="currentNode"
        ref="addDept"
        @updateDeptsList="loadDepts()"
      />
      <el-card class="box-card">
        <treeTools
          :isRoot="true"
          :treeNode="{ name: '传智教育', manager: '负责人' }"
          @add="addDialogVisible = true"
        ></treeTools>
        <!-- 树形 -->
        <el-tree
          :data="treeData"
          :props="defaultProps"
          accordion
          default-expand-all
        >
          <template v-slot="{ data }">
            <treeTools
              :treeNode="data"
              @remove="loadDepts()"
              @add="addFn"
              @editDepts="editFn"
            ></treeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from "./modules/tree-tools.vue";
import { getDepts } from "@/api/departments";
import { transListToTree } from "@/utils";
import AddDept from "./components/add-dept.vue";
export default {
  components: {
    treeTools,
    AddDept,
  },
  data() {
    return {
      defaultProps: {
        label: "name",
      },
      treeData: [],
      addDialogVisible: false,
      currentNode: {},
      loading: false,
    };
  },

  created() {
    this.loadDepts();
  },

  methods: {
    async loadDepts() {
      this.loading = true;
      const res = await getDepts();
      this.loading = false;
      console.log(res);

      console.log(newres);

      const newres = transListToTree(res.depts, "");
      this.treeData = res.depts;
    },
    addFn(val) {
      this.addDialogVisible = true;
      this.currentNode = val;
      console.log(this.currentNode);
    },
    editFn(val) {
      console.log(val);
      this.addDialogVisible = true;
      this.$refs.addDept.getDeptsById(val.id);
    },
  },
};
</script>

<style scoped lang="less"></style>
