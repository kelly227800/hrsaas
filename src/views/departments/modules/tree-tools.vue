<template>
  <el-row type="flex" style="width: 100%">
    <el-col>{{ treeNode.name }}</el-col>
    <el-col :span="5">
      <el-row type="flex">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col :span="8">
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="add(treeNode)"
                >添加部门</el-dropdown-item
              >
              <template v-if="!isRoot">
                <el-dropdown-item @click.native="onEdit(treeNode)"
                  >编辑部门</el-dropdown-item
                >
                <el-dropdown-item @click.native="onRemove"
                  >删除部门</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepts } from "@/api/departments";
export default {
  data() {
    return {};
  },
  props: {
    treeNode: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },

  created() {},

  methods: {
    async onRemove() {
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        // console.log(this.treeNode.id);
        await delDepts(this.treeNode.id);
        this.$message.success("删除成功");
        this.$emit("remove");
      } catch (error) {}
    },
    add(val) {
      this.$emit("add", val);
    },
    onEdit(val) {
      this.$emit("editDepts",val);

      // console.log(123);
    },
  },
};
</script>

<style scoped></style>
