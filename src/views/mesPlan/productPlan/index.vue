<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="订单编号" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目编号" prop="projectId">
        <el-input
          v-model="queryParams.projectId"
          placeholder="请输入项目编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生产计划号" prop="serialNo">
        <el-input
          v-model="queryParams.serialNo"
          placeholder="请输入生产计划号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交货日期" prop="deliveryDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.deliveryDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择交货日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请人" prop="applyUser">
        <el-input
          v-model="queryParams.applyUser"
          placeholder="请输入申请人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请时间" prop="applyTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.applyTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择申请时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请状态：0未提交1待审核" prop="applyStatus">
        <el-select v-model="queryParams.applyStatus" placeholder="请选择申请状态：0未提交1待审核" clearable filterable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="审核人" prop="auditUser">
        <el-input
          v-model="queryParams.auditUser"
          placeholder="请输入审核人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核时间" prop="auditTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.auditTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择审核时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="审核意见" prop="auditComment">
        <el-input
          v-model="queryParams.auditComment"
          placeholder="请输入审核意见"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核状态：0审核：未通过1审核通过" prop="auditStatus">
        <el-select v-model="queryParams.auditStatus" placeholder="请选择审核状态：0审核：未通过1审核通过" clearable filterable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['mes:plan:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['mes:plan:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['mes:plan:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['mes:plan:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="planList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="订单编号" align="center" prop="orderId" />
      <el-table-column label="项目编号" align="center" prop="projectId" />
      <el-table-column label="生产计划号" align="center" prop="serialNo" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="交货日期" align="center" prop="deliveryDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deliveryDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" align="center" prop="applyUser" />
      <el-table-column label="申请时间" align="center" prop="applyTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请状态：0未提交1待审核" align="center" prop="applyStatus" />
      <el-table-column label="审核人" align="center" prop="auditUser" />
      <el-table-column label="审核时间" align="center" prop="auditTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.auditTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核意见" align="center" prop="auditComment" />
      <el-table-column label="审核状态：0审核：未通过1审核通过" align="center" prop="auditStatus" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['mes:plan:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['mes:plan:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改生产计划对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="true">
        <el-form-item label="订单编号" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="项目编号" prop="projectId">
          <el-input v-model="form.projectId" placeholder="请输入项目编号" />
        </el-form-item>
        <el-form-item label="生产计划号" prop="serialNo">
          <el-input v-model="form.serialNo" placeholder="请输入生产计划号" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="交货日期" prop="deliveryDate">
          <el-date-picker clearable size="small"
            v-model="form.deliveryDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择交货日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请人" prop="applyUser">
          <el-input v-model="form.applyUser" placeholder="请输入申请人" />
        </el-form-item>
        <el-form-item label="申请时间" prop="applyTime">
          <el-date-picker clearable size="small"
            v-model="form.applyTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择申请时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请状态：0未提交1待审核">
          <el-radio-group v-model="form.applyStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核人" prop="auditUser">
          <el-input v-model="form.auditUser" placeholder="请输入审核人" />
        </el-form-item>
        <el-form-item label="审核时间" prop="auditTime">
          <el-date-picker clearable size="small"
            v-model="form.auditTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择审核时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核意见" prop="auditComment">
          <el-input v-model="form.auditComment" placeholder="请输入审核意见" />
        </el-form-item>
        <el-form-item label="审核状态：0审核：未通过1审核通过">
          <el-radio-group v-model="form.auditStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-divider content-position="center">生产计划明细信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddMesProductPlanDetail">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteMesProductPlanDetail">删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="mesProductPlanDetailList" :row-class-name="rowMesProductPlanDetailIndex" @selection-change="handleMesProductPlanDetailSelectionChange" ref="mesProductPlanDetail">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50"/>
          <el-table-column label="物料档案id" prop="materialId" width="150">
            <template slot-scope="scope">
             <el-form-item :prop="'mesProductPlanDetailList.'+scope.$index+'.materialId'" :rules="rules.materialId">
              <el-input v-model="scope.row.materialId" placeholder="请输入物料档案id" />
             </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="BOM单编号" prop="bomId" width="150">
            <template slot-scope="scope">
             <el-form-item :prop="'mesProductPlanDetailList.'+scope.$index+'.bomId'" :rules="rules.bomId">
              <el-input v-model="scope.row.bomId" placeholder="请输入BOM单编号" />
             </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="生产数量" prop="quantity" width="150">
            <template slot-scope="scope">
             <el-form-item :prop="'mesProductPlanDetailList.'+scope.$index+'.quantity'" :rules="rules.quantity">
              <el-input v-model="scope.row.quantity" placeholder="请输入生产数量" />
             </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="生产日期" prop="productDate" width="240">
            <template slot-scope="scope">
             <el-form-item :prop="'mesProductPlanDetailList.'+scope.$index+'.productDate'" :rules="rules.productDate">
              <el-date-picker clearable v-model="scope.row.productDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择生产日期" />
             </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listPlan, getPlan, delPlan, addPlan, updatePlan, exportPlan } from "@/api/mes/plan";

export default {
  name: "Plan",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedMesProductPlanDetail: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 生产计划表格数据
      planList: [],
      // 生产计划明细表格数据
      mesProductPlanDetailList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderId: null,
        projectId: null,
        serialNo: null,
        name: null,
        deliveryDate: null,
        applyUser: null,
        applyTime: null,
        applyStatus: null,
        auditUser: null,
        auditTime: null,
        auditComment: null,
        auditStatus: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  watch: {
    'mesProductPlanDetailList': {
      handler(newVal, oldVal) {
        this.form.mesProductPlanDetailList = newVal;
      },
      immediate: true,
      deep: true,
    }
  },
  methods: {
    /** 查询生产计划列表 */
    getList() {
      this.loading = true;
      listPlan(this.queryParams).then(response => {
        this.planList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        orderId: null,
        projectId: null,
        serialNo: null,
        name: null,
        deliveryDate: null,
        applyUser: null,
        applyTime: null,
        applyStatus: "0",
        auditUser: null,
        auditTime: null,
        auditComment: null,
        auditStatus: "0",
        remark: null,
        mesProductPlanDetailList: [],
      };
      this.mesProductPlanDetailList = [];
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加生产计划";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPlan(id).then(response => {
        this.form = response.data;
        this.mesProductPlanDetailList = response.data.mesProductPlanDetailList;
        this.open = true;
        this.title = "修改生产计划";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          
          if (this.form.id != null) {
            updatePlan(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPlan(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除生产计划编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPlan(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
	/** 生产计划明细序号 */
    rowMesProductPlanDetailIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 生产计划明细添加按钮操作 */
    handleAddMesProductPlanDetail() {
      let obj = {};
      obj.materialId = "";
      obj.bomId = "";
      obj.quantity = "";
      obj.productDate = "";
      this.mesProductPlanDetailList.push(obj);
    },
    /** 生产计划明细删除按钮操作 */
    handleDeleteMesProductPlanDetail() {
      if (this.checkedMesProductPlanDetail.length == 0) {
        this.$alert("请先选择要删除的生产计划明细数据", "提示", { confirmButtonText: "确定", });
      } else {
        this.mesProductPlanDetailList.splice(this.checkedMesProductPlanDetail[0].index - 1, 1);
      }
    },
    /** 单选框选中数据 */
    handleMesProductPlanDetailSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.mesProductPlanDetail.clearSelection();
        this.$refs.mesProductPlanDetail.toggleRowSelection(selection.pop());
      } else {
        this.checkedMesProductPlanDetail = selection;
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有生产计划数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportPlan(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
