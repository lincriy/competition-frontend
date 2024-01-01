<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="领料单号" prop="planId">
        <el-input
          v-model="queryParams.serialNo"
          placeholder="请输入领料单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="领取日期" prop="requisitionDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.requisitionDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择领取日期">
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
      <el-form-item label="申请状态" prop="applyStatus">
        <el-select v-model="queryParams.applyStatus" placeholder="请选择申请状态" clearable filterable size="small">
          <el-option
            v-for="dict in applyStatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="审核人" prop="auditUser">
        <el-select v-model="form.auditUser" placeholder="请选择审核人" clearable filterable>
          <el-option
              v-for="dict in auditUserOptions"
              :key="dict.dictLabel"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
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
          <el-option
            v-for="dict in auditStatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
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
          v-hasPermi="['mes:requisition:add']"
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
          v-hasPermi="['mes:requisition:edit']"
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
          v-hasPermi="['mes:requisition:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['mes:requisition:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="requisitionList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="领料单号" align="center" prop="serialNo" />
      <el-table-column label="生产计划" align="center" prop="productPlan" />

      <el-table-column label="计划排产" align="center" prop="productSchedule" />
      <el-table-column label="产品" align="center" prop="name" />
      <el-table-column label="型号" align="center" prop="model" />
      <el-table-column label="规格" align="center" prop="specification" />
      <el-table-column label="单位" align="center" prop="unit" />
      <el-table-column label="领取日期" align="center" prop="requisitionDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.requisitionDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" align="center" prop="applyUser" />
      <el-table-column label="申请时间" align="center" prop="applyTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请状态" align="center" prop="applyStatus" :formatter="applyStatusFormat" />
      <el-table-column label="审核人" align="center" prop="auditUser" />
      <el-table-column label="审核时间" align="center" prop="auditTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.auditTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" prop="auditStatus" :formatter="auditStatusFormat" />
      <el-table-column label="审核意见" align="center" prop="auditComment" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['mes:requisition:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['mes:requisition:remove']"
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

    <!-- 添加或修改领料单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="true">
        <el-form-item label="领料单号" prop="serialNo">
          <el-input v-model="form.serialNo" placeholder="请输入流水号" />
        </el-form-item>
        <!-- <el-form-item label="生产计划" prop="productPlan">
          <el-input v-model="form.productPlan" placeholder="请输入生产计划" />
        </el-form-item> -->
        <el-form-item label="计划排产" prop="productSchedule">
          <el-input v-model="form.productSchedule" placeholder="请输入计划排产">
            <el-button slot="append" @click="handelSelectProductSchedule">选择</el-button>
          </el-input>
          
        </el-form-item>
        <el-form-item label="产品" prop="name">
          <el-input v-model="form.name" placeholder="请输入产品" />
        </el-form-item>
        <el-form-item label="规格" prop="specification">
          <el-input v-model="form.specification" placeholder="请输入规格" />
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="form.model" placeholder="请输入型号" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="待产数量" prop="requireQuantity">
          <el-input v-model="form.unit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="生产日期" prop="productDate">
          <el-date-picker clearable size="small"
            v-model="form.requisitionDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择生产日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="领取日期" prop="requisitionDate">
          <el-date-picker clearable size="small"
            v-model="form.requisitionDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择领取日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态" clearable filterable>
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictLabel"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
        <el-form-item label="申请状态" prop="applyStatus">
          <el-select v-model="form.applyStatus" placeholder="请选择申请状态" clearable filterable>
            <el-option
              v-for="dict in applyStatusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核人" prop="auditUser">
          <el-select v-model="form.auditUser" placeholder="请选择审核人" clearable filterable>
            <el-option
              v-for="dict in auditUserOptions"
              :key="dict.dictLabel"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核时间" prop="auditTime">
          <el-date-picker clearable size="small"
            v-model="form.auditTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择审核时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核状态" prop="auditStatus">
          <el-select v-model="form.auditStatus" placeholder="请选择审核状态" clearable filterable>
            <el-option
              v-for="dict in auditStatusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核意见" prop="auditComment">
          <el-input v-model="form.auditComment"  type="textarea"  placeholder="请输入审核意见" />
        </el-form-item>
        <el-divider content-position="center">领料单物料明细信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddMesMaterialRequisitionDetail">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteMesMaterialRequisitionDetail">删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="mesMaterialRequisitionDetailList" :row-class-name="rowMesMaterialRequisitionDetailIndex" @selection-change="handleMesMaterialRequisitionDetailSelectionChange" ref="mesMaterialRequisitionDetail">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50"/>
          <el-table-column label="物料" align="center" prop="name" />
      <el-table-column label="型号" align="center" prop="model" />
      <el-table-column label="规格" align="center" prop="specification" />
      <el-table-column label="单位" align="center" prop="unit" />
          <el-table-column label="需求数量" prop="requireQuantity" width="150">
            <template slot-scope="scope">
             <el-form-item :prop="'mesMaterialRequisitionDetailList.'+scope.$index+'.requireQuantity'" :rules="rules.requireQuantity">
              <el-input v-model="scope.row.requireQuantity" placeholder="请输入需求数量" />
             </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="已领数量" prop="receiveQuantity" width="150">
            <template slot-scope="scope">
             <el-form-item :prop="'mesMaterialRequisitionDetailList.'+scope.$index+'.receiveQuantity'" :rules="rules.receiveQuantity">
              <el-input v-model="scope.row.receiveQuantity" placeholder="请输入已领数量" />
             </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="detailRemark" width="150">
            <template slot-scope="scope">
             <el-form-item :prop="'mesMaterialRequisitionDetailList.'+scope.$index+'.detailRemark'" :rules="rules.detailRemark">
              <el-input v-model="scope.row.detailRemark" placeholder="请输入备注" />
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
    <product-schedule-select :open="openProductSchedule" @onSelected="handleProductScheduleSelected" @onCancel="handleProductScheduleCancel" ></product-schedule-select>
  </div>
</template>

<script>
import { listRequisition, getRequisition, delRequisition, addRequisition, updateRequisition, exportRequisition } from "@/api/mes/requisition";
import ProductScheduleSelect from '@/components/product/ProductScheduleSelect.vue';
export default {
  name: "Requisition",
  components: {
    ProductScheduleSelect
  },
  data() {
    return {
      openProductSchedule: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedMesMaterialRequisitionDetail: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 领料单表格数据
      requisitionList: [],
      // 领料单物料明细表格数据
      mesMaterialRequisitionDetailList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 申请状态字典
      applyStatusOptions: [],
      auditUserOptions:[],
      statusOptions:[],
      // 审核状态字典
      auditStatusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        serialNo: null,
        requisitionDate: null,
        applyUser: null,
        applyTime: null,
        applyStatus: null,
        auditUser: null,
        auditTime: null,
        auditStatus: null,
        auditComment: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        scheduleId: [
          { required: true, message: "计划排产id不能为空", trigger: "blur" }
        ],
        requisitionDate: [
          { required: true, message: "领取日期不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("apply_status").then(response => {
      this.applyStatusOptions = response.data;
    });
    this.getDicts("audit_status").then(response => {
      this.auditStatusOptions = response.data;
    });
    this.getQueryData("audit_user").then(res => {
      this.auditUserOptions = res.data;
    });
    this.getQueryData("status_query").then(res => {
      this.statusOptions = res.data;
    });
  },
  watch: {
    'mesMaterialRequisitionDetailList': {
      handler(newVal, oldVal) {
        this.form.mesMaterialRequisitionDetailList = newVal;
      },
      immediate: true,
      deep: true,
    }
  },
  methods: {
    /** 查询领料单列表 */
    getList() {
      this.loading = true;
      listRequisition(this.queryParams).then(response => {
        this.requisitionList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 申请状态字典翻译
    applyStatusFormat(row, column) {
      return this.selectDictLabel(this.applyStatusOptions, row.applyStatus);
    },
    // 审核状态字典翻译
    auditStatusFormat(row, column) {
      return this.selectDictLabel(this.auditStatusOptions, row.auditStatus);
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
        serialNo: null,
        planId: null,
        scheduleId: null,
        productId: null,
        requisitionDate: null,
        applyUser: null,
        applyTime: null,
        applyStatus: null,
        auditUser: null,
        auditTime: null,
        auditStatus: null,
        auditComment: null,
        status: "0",
        remark: null,
        mesMaterialRequisitionDetailList: [],
      };
      this.mesMaterialRequisitionDetailList = [];
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
      this.title = "添加领料单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRequisition(id).then(response => {
        this.form = response.data;
        this.mesMaterialRequisitionDetailList = response.data.mesMaterialRequisitionDetailList;
        this.open = true;
        this.title = "修改领料申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          
          if (this.form.id != null) {
            updateRequisition(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRequisition(this.form).then(response => {
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
      this.$confirm('是否确认删除领料单编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delRequisition(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
	/** 领料单物料明细序号 */
    rowMesMaterialRequisitionDetailIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 领料单物料明细添加按钮操作 */
    handleAddMesMaterialRequisitionDetail() {
      let obj = {};
      obj.materialId = "";
      obj.requireQuantity = "";
      obj.receiveQuantity = "";
      obj.detailRemark = "";
      this.mesMaterialRequisitionDetailList.push(obj);
    },
    /** 领料单物料明细删除按钮操作 */
    handleDeleteMesMaterialRequisitionDetail() {
      if (this.checkedMesMaterialRequisitionDetail.length == 0) {
        this.$alert("请先选择要删除的领料单物料明细数据", "提示", { confirmButtonText: "确定", });
      } else {
        this.mesMaterialRequisitionDetailList.splice(this.checkedMesMaterialRequisitionDetail[0].index - 1, 1);
      }
    },
    /** 单选框选中数据 */
    handleMesMaterialRequisitionDetailSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.mesMaterialRequisitionDetail.clearSelection();
        this.$refs.mesMaterialRequisitionDetail.toggleRowSelection(selection.pop());
      } else {
        this.checkedMesMaterialRequisitionDetail = selection;
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有领料单数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportRequisition(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    },
    handelSelectProductSchedule(){
      this.openProductSchedule = true
    },
    handleProductScheduleCancel(){
      this.openProductSchedule = false
    },
    handleProductScheduleSelected(row){
      this.openProductSchedule = false
      this.form.productSchedule = row.planNo
    }
  }
};
</script>
