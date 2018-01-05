<template>
  <div>
    <el-row>
      <el-col :span="24" style="margin: 0 0 20px 0;">
        <el-radio-group v-model="radio">
          <el-radio-button label="新订单"></el-radio-button>
          <el-radio-button label="已导出订单"></el-radio-button>
          <el-radio-button label="完结订单"></el-radio-button>
          <el-radio-button label="作废订单"></el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-col :span="24" style="display: flex;  justify-content:flex-start;  margin:  0 0 20px 0">
      <div style="display: flex">
        <el-input placeholder="请输入关键字或订单号搜索" style="width: 200px"></el-input>
        <el-button style="height: 40px">订单搜索</el-button>
      </div>
      <div style="margin:  8px 10px 0 20px">
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
      <el-button type="warning" style="width: 99px;height: 34px" @click="getorders()">统计</el-button>
      <el-button type="primary" style="width: 99px;height: 34px" @click="excel()">导出</el-button>
    </el-col>
    <el-col :span="24" style="padding: 0 0 50px 0 ">
      <el-table
        :data="order"
        style="width: 100%;margin:  0 0 40px 0"
        :row-class-name="tableRowClassName">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户名 :">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="下单时间 :">
                <span>{{ props.row.createtime }}</span>
              </el-form-item>
              <el-form-item label="收货地址 :">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="订单金额 :">
                <span>{{ props.row.amount }}</span>
              </el-form-item>
              <el-form-item label="联系电话 :">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="商品 :">
                <span>{{ props.row.updateactorid }}</span>
              </el-form-item>
              <el-form-item style="display: flex; justify-content:center;width:100%">
                <el-button type="primary">查看详情</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="全选"
          prop="id">
        </el-table-column>
        <el-table-column>

        </el-table-column>
        <el-table-column
          prop="orderStatus">
        </el-table-column>
      </el-table>
      <div style="display: flex;  justify-content:center;">
        <el-pagination
          :page-sizes="[3,5]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="totalpages">
        </el-pagination>
      </div>
    </el-col>
    <i class="icon-fanhui iconfont"></i>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {ElRow},
    data () {
      return {
        radio: '新订单',
        order: [],
        orderpage: [],
        goods: [],
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
        value1: '',
        totalpages: 10,
        total: 0,
        page: 1,
        size: 3,
      };
    },
    methods: {
      add0(m){
        return m < 10 ? '0' + m : m
      },
      getLocalTime(shijianchuo) {
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
      },
      tableRowClassName() {
        return 'warning-row';
      },
      getorders(){
        this.axios({
          method: 'post',
          url: '/gcsweixin/shop/order/findbyproducttype',
          params: {
            producttype: 2
          }
        }).then((res) => {
          //console.log(res.data.data);
          this.order = [];
          this.orderpage = [];
          res.data.data.forEach(value => {

            if (value.orderStatus === 1) {
              value.orderStatus = '完结';
            }
            else if (value.orderStatus === 0) {
              value.orderStatus = '未完结';
            }
            value.amount = Number(value.amount) / 100;

            this.goods=[];
            for (let j = 0; j < value.items.length; j++) {
              this.goods.push(value.items[j].product['name'] + '*' + value.items[j].count)
              value.updateactorid= this.goods.toString();
            }

            if(this.value1===null||this.value1===''){
              value.createtime=this.getLocalTime(value.createtime);
              this.orderpage.push(value);
            }else if(value.createtime>= this.value1[0] && value.createtime<=this.value1[1]){
              value.createtime=this.getLocalTime(value.createtime);
              this.orderpage.push(value);
            }

          })

          this.totalpages=this.orderpage.length;
          let arr = this.orderpage;
          let currentArr = [];
          let page = this.size;
          let currentPage = this.page;
          let StartNum = (currentPage - 1) * page;
          let EndNum = currentPage * page;
          for (let i = StartNum; i < EndNum; i++) {
            if (!arr[i]) {
              break;
            }
            currentArr.push(arr[i]);
          }
          console.log(currentArr);
          this.order = currentArr;
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.size = val;
        this.getorders();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getorders();
      },
      // handleDownload() {
      //   require.ensure([], () => {
      //     const {export_json_to_excel} = require('@/vendor/Export2Excel');
      //     const tHeader = ['订单编号', '用户名', '下单时间', '收获地址', '订单金额', '联系电话', '商品', '状态']
      //     const filterVal = ['id', 'name', 'createtime', 'address', 'amount', 'phone', 'address', 'selection']
      //     const list = this.order
      //     const data = this.formatJson(filterVal, list)
      //     export_json_to_excel(tHeader, data, '实物类订单')
      //   })
      // },
      // formatJson(filterVal, jsonData) {
      //   return jsonData.map(v => filterVal.map(j => v[j]))
      // },
      excel(){
        location.href='https://www.embracex.com/gcsweixin/shop/order/exportorder';
      }
    },
    mounted(){
      this.getorders();
    }
  }
</script>

<style>

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-table .warning-row {
    background: rgb(133, 184, 89);
    color: white;
  }

  .el-table__expand-icon {
    color: white;
  }
</style>
