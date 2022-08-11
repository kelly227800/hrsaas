<template>
  <el-dialog :title="addoredit" :visible="visible" width="50%" @close="closeFn">
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input placeholder="1-50个字符" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input placeholder="1-50个字符" v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select placeholder="请选择负责人" v-model="formData.manager">
          <el-option
            :label="item.username"
            v-for="item in employess"
            :key="item.id"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          placeholder="1-300个字符"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeFn">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDepts,
  addDepts,
  getDeptsById,
  editDeptsById,
} from "@/api/departments";
import { getEmployeesApi } from "@/api/employees";
export default {
  data() {
    const checkDeptsName = async (rule, value, callback) => {
      // console.log(this.currentNode);
      if (this.formData.id) {
        const { depts } = await getDepts();
        const filtersDepts = depts.filter(
          (item) =>
            item.pid === this.formData.pid && item.id !== this.formData.id
        );
        const isRepeat = filtersDepts.some((item) => item.name === value);
        isRepeat ? callback(new Error("部门重复")) : callback();
      } else {
        if (!this.currentNode.children) return callback();
        const isRepeat = this.currentNode.children.some(
          (item) => item.name === value
        );
        // console.log(isRepeat);
        isRepeat ? callback(new Error("部门重复")) : callback();
      }
    };

    const checkDeptsCode = async (rule, value, callback) => {
      // console.log(this.currentNode);
      const depts = await getDepts();
      let isRepeat;
      if (this.formData.id) {
        isRepeat = depts.depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value);
        isRepeat ? callback(new Error("部门编码重复")) : callback();
      } else {
        isRepeat = depts.depts.some((item) => item.code === value);
        // console.log(isRepeat);
      }
      isRepeat ? callback(new Error("部门编码重复")) : callback();
      // console.log(depts);
    };
    return {
      employess: [],
      formData: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      },
      formRules: {
        name: [
          { required: true, trigger: "blur", message: "请输入部门名称" },
          {
            validator: checkDeptsName,
            trigger: "blur",
          },
        ],
        code: [
          { required: true, trigger: "blur", message: "请输入部门编码" },
          {
            validator: checkDeptsCode,
            trigger: "blur",
          },
        ],
        manager: {
          required: true,
          trigger: "change",
          message: "请输入部门负责人",
        },
        introduce: {
          required: true,
          trigger: "blur",
          message: "请输入部门介绍",
        },
      },
    };
  },
  computed: {
    addoredit() {
      return this.formData.id ? "编辑部门" : "添加部门";
    },
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    async getEmployess() {
      const res = await getEmployeesApi();
      // console.log(res);
      this.employess = res;
    },
    closeFn() {
      this.$emit("update:visible", false);
      this.$refs.form.resetFields(),
        (this.formData = {
          name: "",
          code: "",
          manager: "",
          introduce: "",
        });
    },
    async onSave() {
      await this.$refs.form.validate();
      if (this.formData.id) {
        await editDeptsById(this.formData);
        this.closeFn();
        this.$emit("updateDeptsList");
      } else {
        try {
          this.formData.pid = this.currentNode.id;
          const res = await addDepts(this.formData);
          // console.log(res);
          this.closeFn();
          this.$emit("updateDeptsList");
        } catch (error) {}
      }
      // console.log(11);
    },
    async getDeptsById(val) {
      console.log(val);
      this.formData = await getDeptsById(val);
      console.log(this.formData);
    },
  },
  created() {
    this.getEmployess();
  },
};
</script>

<style scoped lang="less"></style>
