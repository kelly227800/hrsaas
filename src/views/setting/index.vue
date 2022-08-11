<template>
  <div class="addDialog">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="角色管理" name="first">
        <el-button type="primary" @click="addDialogVisible = true"
          >新增角色</el-button
        >
        <el-table :data="tableData" style="width: 100%" border size="small">
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="100"
          ></el-table-column>
          <el-table-column prop="name" label="角色" align="center">
          </el-table-column>
          <el-table-column prop="description" label="描述" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template>
              <el-button size="small" type="success">分配权限</el-button>
              <el-button size="small" type="primary">编辑</el-button>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="sizes,prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :page-sizes="[3, 5, 10, 20]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="second">
        <el-alert
          title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
          type="info"
          :closable="false"
          show-icon
        >
        </el-alert>
        <el-form ref="form" label-width="80px">
          <el-form-item label="公司名称">
            <el-input disabled v-model="companyInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input disabled v-model="companyInfo.companyAddress"></el-input>
          </el-form-item>
          <el-form-item label="公司邮箱">
            <el-input disabled v-model="companyInfo.mailbox"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input disabled v-model="companyInfo.remarks"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 新增对话框 -->
    <el-dialog
      title="新增"
      :visible.sync="addDialogVisible"
      width="40%"
      @close="closeAddDialogFn"
    >
      <el-form
        :model="addRoleForm"
        ref="form"
        :rules="addRoleFormRules"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.region"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onAddRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getRoLeListApi, addRoLeAPi } from "@/api/role";
import { getCompanyInfoApi } from "@/api/setting";
export default {
  data() {
    return {
      activeName: "first",
      tableData: [],
      page: 1,
      pageSize: 3,
      total: 0,
      addDialogVisible: false,
      addRoleForm: {
        name: "",
        region: "",
      },
      addRoleFormRules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      companyInfo: {}
    };
  },
  methods: {
    // 点击取消关闭对话框
    onClose() {
      this.addDialogVisible = false;
    },
    // 关闭对话框以后回调事件
    closeAddDialogFn() {
      this.$refs.form.resetFields();
      this.addRoleForm.region = "";
    },
    // 添加角色
    async onAddRole() {
      await this.$refs.form.validate();
      // console.log("表单校验通过");
      await addRoLeAPi(this.addRoleForm);
      this.$message.success("添加成功");
      this.addDialogVisible = false;
      this.closeAddDialogFn();
      this.getRoLeList();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获取角色列表
    async getRoLeList() {
      const { rows, total } = await getRoLeListApi({
        page: this.page,
        pagesize: this.pageSize,
      });
      this.tableData = rows;
      this.total = total;
    },
    // 根据id查询企业
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId
      );
      this.companyInfo = res
      console.log(res);
    },
    // 页面尺寸变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.getRoLeList();
    },
    // 页码变化
    handleCurrentChange(val) {
      this.page = val;
      this.getRoLeList();
    },
  },
  created() {
    this.getRoLeList();
    this.getCompanyInfo();
  },
};
</script>
<style lang="scss" scoped>
.addDialog {
  padding: 0 20px;
  .el-table {
    margin-top: 15px;
  }
}
</style>
