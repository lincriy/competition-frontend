<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="计划编号" prop="planId">
        <el-input
          v-model="queryParams.planId"
          placeholder="请输入计划编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单编号" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料编号" prop="materialId">
        <el-input
          v-model="queryParams.materialId"
          placeholder="请输入物料编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="BOM单编号" prop="bomId">
        <el-input
          v-model="queryParams.bomId"
          placeholder="请输入BOM单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生产线编号" prop="productLineId">
        <el-input
          v-model="queryParams.productLineId"
          placeholder="请输入生产线编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工艺编号" prop="processId">
        <el-input
          v-model="queryParams.processId"
          placeholder="请输入工艺编号"
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
      <el-form-item label="待产数量" prop="requireQuantity">
        <el-input
          v-model="queryParams.requireQuantity"
          placeholder="请输入待产数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="已产数量" prop="productQuantity">
        <el-input
          v-model="queryParams.productQuantity"
          placeholder="请输入已产数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生产日期" prop="productDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.productDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择生产日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="交货日期" prop="deliveryDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.deliveryDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择交货日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="queryParams.remark"
          placeholder="请输入备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="领料状态" prop="receiveStatus">
        <el-select v-model="queryParams.receiveStatus" placeholder="请选择领料状态" clearable filterable size="small">
          <el-option
            v-for="dict in receiveStatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="排产编号" prop="serialNo">
        <el-input
          v-model="queryParams.serialNo"
          placeholder="请输入排产编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['mes:schedule:add']"
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
          v-hasPermi="['mes:schedule:edit']"
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
          v-hasPermi="['mes:schedule:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['mes:schedule:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="scheduleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="计划编号" align="center" prop="planId" />
      <el-table-column label="订单编号" align="center" prop="orderId" />
      <el-table-column label="物料编号" align="center" prop="materialId" />
      <el-table-column label="BOM单编号" align="center" prop="bomId" />
      <el-table-column label="生产线编号" align="center" prop="productLineId" />
      <el-table-column label="工艺编号" align="center" prop="processId" />
      <el-table-column label="项目编号" align="center" prop="projectId" />
      <el-table-column label="待产数量" align="center" prop="requireQuantity" />
      <el-table-column label="已产数量" align="center" prop="productQuantity" />
      <el-table-column label="生产日期" align="center" prop="productDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.productDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="交货日期" align="center" prop="deliveryDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deliveryDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="发布状态" align="center" prop="status" />
      <el-table-column label="领料状态" align="center" prop="receiveStatus" :formatter="receiveStatusFormat" />
      <el-table-column label="排产编号" align="center" prop="serialNo" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['mes:schedule:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['mes:schedule:remove']"
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

    <!-- 添加或修改计划排产对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="true">
        <el-form-item label="计划编号" prop="planId">
          <el-input v-model="form.planId" placeholder="请输入计划编号" />
        </el-form-item>
        <el-form-item label="订单编号" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="物料编号" prop="materialId">
          <el-input v-model="form.materialId" placeholder="请输入物料编号" />
        </el-form-item>
        <el-form-item label="BOM单编号" prop="bomId">
          <el-input v-model="form.bomId" placeholder="请输入BOM单编号" />
        </el-form-item>
        <el-form-item label="生产线编号" prop="productLineId">
          <el-input v-model="form.productLineId" placeholder="请输入生产线编号" />
        </el-form-item>
        <el-form-item label="工艺编号" prop="processId">
          <el-input v-model="form.processId" placeholder="请输入工艺编号" />
        </el-form-item>
        <el-form-item label="项目编号" prop="projectId">
          <el-input v-model="form.projectId" placeholder="请输入项目编号" />
        </el-form-item>
        <el-form-item label="待产数量" prop="requireQuantity">
          <el-input v-model="form.requireQuantity" placeholder="请输入待产数量" />
        </el-form-item>
        <el-form-item label="已产数量" prop="productQuantity">
          <el-input v-model="form.productQuantity" placeholder="请输入已产数量" />
        </el-form-item>
        <el-form-item label="生产日期" prop="productDate">
          <el-date-picker clearable size="small"
            v-model="form.productDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择生产日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="交货日期" prop="deliveryDate">
          <el-date-picker clearable size="small"
            v-model="form.deliveryDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择交货日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="发布状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择发布状态" clearable filterable>
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="领料状态" prop="receiveStatus">
          <el-select v-model="form.receiveStatus" placeholder="请选择领料状态" clearable filterable>
            <el-option
              v-for="dict in receiveStatusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排产编号" prop="serialNo">
          <el-input v-model="form.serialNo" placeholder="请输入排产编号" />
        </el-form-item>
        <el-divider content-position="center">排产物料信息信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddMesProductScheduleMaterial">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteMesProductScheduleMaterial">删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="mesProductScheduleMaterialList" :row-class-name="rowMesProductScheduleMaterialIndex" @selection-change="handleMesProductScheduleMaterialSelectionChange" ref="mesProductScheduleMaterial">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50"/>
          <el-table-column label="物料档案编号" prop="materialId" width="150">
            <template slot-scope="scope">
             <el-form-item :prop="'mesProductScheduleMaterialList.'+scope.$index+'.materialId'" :rules="rules.materialId">
              <el-input v-model="scope.row.materialId" placeholder="请输入物料档案编号" />
             </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="需求数量" prop="requireQuantity" width="150">
            <template slot-scope="scope">
             <el-form-item :prop="'mesProductScheduleMaterialList.'+scope.$index+'.requireQuantity'" :rules="rules.requireQuantity">
              <el-input v-model="scope.row.requireQuantity" placeholder="请输入需求数量" />
             </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="已用数量" prop="usageQuantity" width="150">
            <template slot-scope="scope">
             <el-form-item :prop="'mesProductScheduleMaterialList.'+scope.$index+'.usageQuantity'" :rules="rules.usageQuantity">
              <el-input v-model="scope.row.usageQuantity" placeholder="请输入已用数量" />
             </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="剩余数量" prop="leftQuantity" width="150">
            <template slot-scope="scope">
             <el-form-item :prop="'mesProductScheduleMaterialList.'+scope.$index+'.leftQuantity'" :rules="rules.leftQuantity">
              <el-input v-model="scope.row.leftQuantity" placeholder="请输入剩余数量" />
             </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark" width="150">
            <template slot-scope="scope">
             <el-form-item :prop="'mesProductScheduleMaterialList.'+scope.$index+'.remark'" :rules="rules.remark">
              <el-input v-model="scope.row.remark" placeholder="请输入备注" />
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
import { listSchedule, getSchedule, delSchedule, addSchedule, updateSchedule, exportSchedule } from "@/api/mes/schedule";

export default {
  name: "Schedule",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedMesProductScheduleMaterial: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 计划排产表格数据
      scheduleList: [],
      // 排产物料信息表格数据
      mesProductScheduleMaterialList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 领料状态字典
      receiveStatusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        planId: null,
        orderId: null,
        materialId: null,
        bomId: null,
        productLineId: null,
        processId: null,
        projectId: null,
        requireQuantity: null,
        productQuantity: null,
        productDate: null,
        deliveryDate: null,
        remark: null,
        receiveStatus: null,
        serialNo: null
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
    this.getDicts("receive_material_status").then(response => {
      this.receiveStatusOptions = response.data;
    });
  },
  watch: {
    'mesProductScheduleMaterialList': {
      handler(newVal, oldVal) {
        this.form.mesProductScheduleMaterialList = newVal;
      },
      immediate: true,
      deep: true,
    }
  },
  methods: {
    /** 查询计划排产列表 */
    getList() {
      this.loading = true;
      listSchedule(this.queryParams).then(response => {
        this.scheduleList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 领料状态字典翻译
    receiveStatusFormat(row, column) {
      return this.selectDictLabel(this.receiveStatusOptions, row.receiveStatus);
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
        planId: null,
        orderId: null,
        materialId: null,
        bomId: null,
        productLineId: null,
        processId: null,
        projectId: null,
        requireQuantity: null,
        productQuantity: null,
        productDate: null,
        deliveryDate: null,
        remark: null,
        status: null,
        receiveStatus: null,
        serialNo: null,
        mesProductScheduleMaterialList: [],
      };
      this.mesProductScheduleMaterialList = [];
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
      this.title = "添加计划排产";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSchedule(id).then(response => {
        this.form = response.data;
        this.mesProductScheduleMaterialList = response.data.mesProductScheduleMaterialList;
        this.open = true;
        this.title = "修改计划排产";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          
          if (this.form.id != null) {
            updateSchedule(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSchedule(this.form).then(response => {
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
      this.$confirm('是否确认删除计划排产编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delSchedule(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
	/** 排产物料信息序号 */
    rowMesProductScheduleMaterialIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 排产物料信息添加按钮操作 */
    handleAddMesProductScheduleMaterial() {
      let obj = {};
      obj.materialId = "";
      obj.requireQuantity = "";
      obj.usageQuantity = "";
      obj.leftQuantity = "";
      obj.remark = "";
      this.mesProductScheduleMaterialList.push(obj);
    },
    /** 排产物料信息删除按钮操作 */
    handleDeleteMesProductScheduleMaterial() {
      if (this.checkedMesProductScheduleMaterial.length == 0) {
        this.$alert("请先选择要删除的排产物料信息数据", "提示", { confirmButtonText: "确定", });
      } else {
        this.mesProductScheduleMaterialList.splice(this.checkedMesProductScheduleMaterial[0].index - 1, 1);
      }
    },
    /** 单选框选中数据 */
    handleMesProductScheduleMaterialSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.mesProductScheduleMaterial.clearSelection();
        this.$refs.mesProductScheduleMaterial.toggleRowSelection(selection.pop());
      } else {
        this.checkedMesProductScheduleMaterial = selection;
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有计划排产数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportSchedule(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
