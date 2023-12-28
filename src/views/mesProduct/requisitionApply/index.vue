<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="领料单号" prop="applyOrderNumber">
        <el-input
          v-model="queryParams.applyOrderNumber"
          placeholder="请输入领料单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="领取日期" prop="collectionDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.collectionDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择领取日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请人" prop="proposer">
        <el-input
          v-model="queryParams.proposer"
          placeholder="请输入申请人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请时间" prop="timeOfApplication">
        <el-date-picker clearable size="small"
          v-model="queryParams.timeOfApplication"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择申请时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请状态" prop="applicationStatus">
        <el-select v-model="queryParams.applicationStatus" placeholder="请选择申请状态" clearable filterable size="small">
          <el-option label="未提交" value="未提交" />
          <el-option label="已提交" value="已提交" />
          <el-option label="已完成" value="已完成" />
        </el-select>
      </el-form-item>
      <el-form-item label="审核人" prop="auditor">
        <el-input
          v-model="queryParams.auditor"
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
      <el-form-item label="审核状态" prop="auditStatus">
        <el-select v-model="queryParams.auditStatus" placeholder="请选择审核状态" clearable filterable size="small">
          <el-option label="未提交" value="未提交" />
          <el-option label="已提交" value="已提交" />
          <el-option label="已完成" value="已完成" />
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
          v-hasPermi="['mes:RequisitionApply:add']"
        >新建</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['mes:RequisitionApply:edit']"
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
          v-hasPermi="['mes:RequisitionApply:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['mes:RequisitionApply:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="RequisitionApplyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="领料单号" align="center" prop="applyOrderNumber" />
      <el-table-column label="生产计划" align="center" prop="producePlan" />
      <el-table-column label="计划排产（*必填项）" align="center" prop="planningAndScheduling" />
      <el-table-column label="产品型号" align="center" prop="productModel" />
      <el-table-column label="产品规格" align="center" prop="productStandard" />
      <el-table-column label="单位" align="center" prop="unit" />
      <el-table-column label="领取日期" align="center" prop="collectionDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.collectionDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" align="center" prop="proposer" />
      <el-table-column label="申请时间" align="center" prop="timeOfApplication" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.timeOfApplication, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请状态" align="center" prop="applicationStatus" />
      <el-table-column label="审核人" align="center" prop="auditor" />
      <el-table-column label="审核时间" align="center" prop="auditTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.auditTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" prop="auditStatus" />
      <el-table-column label="状态" align="center" prop="state" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['mes:RequisitionApply:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['mes:RequisitionApply:remove']"
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

    <!-- 添加或修改领料申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="领料单号" prop="applyOrderNumber">
          <el-input v-model="form.applyOrderNumber" placeholder="请输入领料单号" />
        </el-form-item>
        <el-form-item label="生产计划" prop="producePlan">
          <el-input v-model="form.producePlan" placeholder="请输入生产计划" />
        </el-form-item>
        <el-form-item label="计划排产*" prop="planningAndScheduling">
          <el-input v-model="form.planningAndScheduling" placeholder="请输入计划排产" />
        </el-form-item>
        <el-form-item label="产品型号" prop="productModel">
          <el-input v-model="form.productModel" placeholder="请输入产品型号" />
        </el-form-item>
        <el-form-item label="产品规格" prop="productStandard">
          <el-input v-model="form.productStandard" placeholder="请输入产品规格" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="领取日期" prop="collectionDate">
          <el-date-picker clearable size="small"
            v-model="form.collectionDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择领取日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请人" prop="proposer">
          <el-input v-model="form.proposer" placeholder="请输入申请人" />
        </el-form-item>
        <el-form-item label="申请时间" prop="timeOfApplication">
          <el-date-picker clearable size="small"
            v-model="form.timeOfApplication"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择申请时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请状态">
          <el-radio-group v-model="form.applicationStatus">
            <el-radio label="未提交">未提交</el-radio>
          <el-radio label="已提交" >已提交</el-radio>
          <el-radio label="已完成" >已完成</el-radio> 
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核人" prop="auditor">
          <el-input v-model="form.auditor" placeholder="请输入审核人" />
        </el-form-item>
        <el-form-item label="审核时间" prop="auditTime">
          <el-date-picker clearable size="small"
            v-model="form.auditTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择审核时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-radio-group v-model="form.auditStatus">
            <el-radio label="未提交">未提交</el-radio>
          <el-radio label="已提交" >已提交</el-radio>
          <el-radio label="已完成" >已完成</el-radio> 
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="form.state" placeholder="请输入状态" />
        </el-form-item>
        <el-form-item label="待产数量" prop="numberOfExpectantBirths">
          <el-input v-model="form.numberOfExpectantBirths" placeholder="请输入待产数量" />
        </el-form-item>
        <el-form-item label="生产日期" prop="dateOfManufacture">
          <el-date-picker clearable size="small"
            v-model="form.dateOfManufacture"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择生产日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="物料" prop="material">
          <el-input v-model="form.material" placeholder="请输入物料" />
        </el-form-item>
        <el-form-item label="需求数量" prop="quantityRequired">
          <el-input v-model="form.quantityRequired" placeholder="请输入需求数量" />
        </el-form-item>
        <el-form-item label="已领数量" prop="quantityClaimed">
          <el-input v-model="form.quantityClaimed" placeholder="请输入已领数量" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listRequisitionApply, getRequisitionApply, delRequisitionApply, addRequisitionApply, updateRequisitionApply, exportRequisitionApply } from "@/api/mesProduct/RequisitionApply";

export default {
  name: "RequisitionApply",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 领料申请表格数据
      RequisitionApplyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        applyOrderNumber: null,
        producePlan: null,
        planningAndScheduling: null,
        productModel: null,
        productStandard: null,
        unit: null,
        collectionDate: null,
        proposer: null,
        timeOfApplication: null,
        applicationStatus: null,
        auditor: null,
        auditTime: null,
        auditStatus: null,
        state: null,
        numberOfExpectantBirths: null,
        dateOfManufacture: null,
        material: null,
        quantityRequired: null,
        quantityClaimed: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        applyOrderNumber: [
          { required: true, message: "领料单号不能为空", trigger: "blur" }
        ],
        producePlan: [
          { required: true, message: "生产计划不能为空", trigger: "blur" }
        ],
        planningAndScheduling: [
          { required: true, message: "计划排产不能为空", trigger: "blur" }
        ],
        productModel: [
          { required: true, message: "产品型号不能为空", trigger: "blur" }
        ],
        productStandard: [
          { required: true, message: "产品规格不能为空", trigger: "blur" }
        ],
        unit: [
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        proposer: [
          { required: true, message: "申请人不能为空", trigger: "blur" }
        ],
        applicationStatus: [
          { required: true, message: "申请状态不能为空", trigger: "blur" }
        ],
        auditor: [
          { required: true, message: "审核人不能为空", trigger: "blur" }
        ],
        auditTime: [
          { required: true, message: "审核时间不能为空", trigger: "blur" }
        ],
        numberOfExpectantBirths: [
          { required: true, message: "待产数量不能为空", trigger: "blur" }
        ],
        dateOfManufacture: [
          { required: true, message: "生产日期不能为空", trigger: "blur" }
        ],
        material: [
          { required: true, message: "物料不能为空", trigger: "blur" }
        ],
        quantityRequired: [
          { required: true, message: "需求数量不能为空", trigger: "blur" }
        ],
        quantityClaimed: [
          { required: true, message: "已领数量不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询领料申请列表 */
    getList() {
      this.loading = true;
      listRequisitionApply(this.queryParams).then(response => {
        this.RequisitionApplyList = response.rows;
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
        applyOrderNumber: null,
        producePlan: null,
        planningAndScheduling: null,
        productModel: null,
        productStandard: null,
        unit: null,
        collectionDate: null,
        proposer: null,
        timeOfApplication: null,
        applicationStatus: "0",
        auditor: null,
        auditTime: null,
        auditStatus: "0",
        state: null,
        numberOfExpectantBirths: null,
        dateOfManufacture: null,
        material: null,
        quantityRequired: null,
        quantityClaimed: null,
      };
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
      this.title = "添加领料申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRequisitionApply(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改领料申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRequisitionApply(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRequisitionApply(this.form).then(response => {
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
      this.$confirm('是否确认删除领料申请编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delRequisitionApply(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有领料申请数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportRequisitionApply(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
