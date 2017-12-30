<template>
  <el-row>
    <el-col :span="24" >
      <el-row type="flex">
        <el-col :span="24" style="display: flex;  justify-content:center;">
          <div style="margin:  8px 10px 0 0">
            起止日期
          </div>
            <el-date-picker
              v-model="value1" style="height: 35px;width: 300px"
              type="daterange"
              :picker-options="pickerOptions1"
              range-separator="至"
              start-placeholder="开始"
              end-placeholder="结束"
              align="center">
            </el-date-picker>
          <div style="margin:  8px 10px 0 10px">
            本周
            本月
          </div>
          <el-button type="warning" style="width: 99px;height: 34px" @click="wqnm()">统计</el-button>
          <el-button type="primary" style="width: 99px;height: 34px" @click="handleDownload()">导出</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24" style="border-top:1px solid rgb(205,210,212);margin: 30px 0 0 0">

    </el-col>
    <el-col :span="24" style="max-height: 800px" >
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="dialogTableVisible = true"
            >详情</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="订单总数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="服务类订单">
        </el-table-column>
        <el-table-column
          prop="address"
          label="实物类订单">
        </el-table-column>
        <el-table-column
          prop="address"
          label="拆让金额">
        </el-table-column>
        <el-table-column
          prop="address"
          label="收入">
        </el-table-column>
      </el-table>
      <el-dialog title="详情" :visible.sync="dialogTableVisible">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="name"
            label="订单总数">
          </el-table-column>
          <el-table-column
            prop="address"
            label="撤单总数">
          </el-table-column>
          <el-table-column
            prop="address"
            label="实物类订单">
          </el-table-column>
          <el-table-column
            prop="address"
            label="实物类订单">
          </el-table-column>
          <el-table-column
            prop="address"
            label="拆让金额">
          </el-table-column>
          <el-table-column
            prop="address"
            label="收入">
          </el-table-column>

        </el-table>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    data() {
      return {
        pickerOptions1: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1:'',
        dialogTableVisible: false,
        start:'',
        end:'',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '666'
        },{
          date: '2015-05-02',
          name: '王q虎',
          address: 'zgeh'
        }]
      }
    },
    methods: {
      handleDownload() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel');
          const tHeader = ['订单总数', '服务类订单', '实物类订单', '拆让金额', '收入']
          const filterVal = ['name', 'address', 'address', 'address', 'address']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '列表excel')

        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },

      wqnm(){
          console.log(this.value1[0].getTime());
          console.log(this.value1[1].getTime());
          console.log(this.value1[0]<this.value1[1]);
      }


    }

  }
</script>

<style>

</style>
