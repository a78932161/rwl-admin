<template>
  <el-row>
    <el-col :span="24">
      <el-row type="flex">
        <el-col :span="24" style="display: flex;  justify-content:center;">

          <el-button type="primary" style="width: 99px;height: 34px; margin:  0 50px 0 0 " @click="handleAdd()">添加商品
          </el-button>

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
          <el-button type="warning" style="width: 99px;height: 34px" @click="getgoods()">统计</el-button>
          <el-button type="primary" style="width: 99px;height: 34px" @click="handleDownload()">导出</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24" style="border-top:1px solid rgb(205,210,212);margin: 30px 0 0 0">

    </el-col>
    <el-col :span="24" style="max-height: 800px;margin:  0 0 40px 0">
      <el-table
        element-loading-text="拼命加载中"
        :data="goods"
        style="width: 100%;margin:  0 0 40px 0"
        :default-sort="{prop: 'sort', order: 'descending'}"
      >
        <el-table-column
          label="编号"
          prop="id"
          sortable>

        </el-table-column>
        <el-table-column
          label="日期"
          sortable
          prop="date">
        </el-table-column>
        <el-table-column
          label="权重"
          sortable
          width="100"
          prop="sort">
        </el-table-column>
        <el-table-column
          width="100"
          label="商品名字"
          prop="name">
        </el-table-column>
        <el-table-column
          width="100"
          label="商品价格"
          prop="price">
        </el-table-column>
        <el-table-column
          width="100"
          label="商品数量"
          prop="stock">
        </el-table-column>

        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button
              type="primary"
              v-if="scope.row.status===1"
              size="mini"
              @click="xiajia(scope.row)">下架
            </el-button>
            <el-button
              type="primary"
              v-if="scope.row.status===0"
              size="mini"
              @click="shangjia(scope.row)">上架
            </el-button>

            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;  justify-content:center; padding: 0 0 50px 0">
        <el-pagination
          :page-sizes="[5, 10 ]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="totalpages">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {
      ElButton,
      ElCol
    },
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
        value1: '',
        dialogTableVisible: false,
        goods: [],
        goodspx: [],
        goodspage: [],
        goodsup: {},
        goodsdw: {},
        totalpages: 10,
        total: 0,
        page: 1,
        size: 5,
      }
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
      mppx(arr){
        for (var i = 0; i < arr.length - 1; i++) {
          for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].sort < arr[j].sort) {//如果前面的数据比后面的大就交换
              var temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;
            }
          }
        }
        return arr;
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({name: 'goupdata', params: row});
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleAdd(){
        this.$router.push({path: '/goadd'});
      },
      getgoods(){
        this.axios({
          method: 'post',
          url: '/gcsweixin/shop/product/findbytype',
          params: {
            type: 1,
          }
        }).then((res) => {
          this.goodspx = this.mppx(res.data);
          this.goods = [];
          this.goodspage = [];

          this.goodspx.forEach(value => {

            if(this.value1===null||this.value1===''){
              value.date = this.getLocalTime(value.date);
              this.goodspage.push(value);
            }else if(value.createtime>= this.value1[0] && value.createtime<=this.value1[1]){
              value.date = this.getLocalTime(value.date);
              this.goodspage.push(value);
            }


          });

          this.totalpages = this.goodspage.length;
          let arr = this.goodspage;
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

          this.goods = currentArr;

        })
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.size = val;
        this.getgoods();
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.page = val;
        this.getgoods();
      },
      datechange(date) {
        date = new Date(Date.parse(date.replace(/-/g, "/")));
        date = date.getTime();
        return date
      },

      shangjia(row){

        this.goodsup = row;
        this.tijiao = {
          'name': this.goodsup.name,
          'old_price': this.goodsup.old_price,
          'price': this.goodsup.price,
          'logo': this.goodsup.logo,
          'image': this.goodsup.image,
          'date': this.datechange(this.goodsup.date),
          'heading': this.goodsup.heading,
          'description': this.goodsup.description,
          'stock': this.goodsup.stock,
          'status': 1,
          'sort': this.goodsup.sort,
          'type': this.goodsup.type,
        };
        this.axios({
          method: 'post',
          url: '/gcsweixin/shop/product/update',
          params: {
            productid: this.goodsup.id
          },
          data: this.tijiao
        }).then((res) => {
          this.$message({
            message: '上架成功',
            type: 'success'
          });
          this.getgoods();
        })
      },

      xiajia(row)
      {
        this.goodsup = row;
        this.tijiao = {
          'name': this.goodsup.name,
          'old_price': this.goodsup.old_price,
          'price': this.goodsup.price,
          'logo': this.goodsup.logo,
          'image': this.goodsup.image,
          'date': this.datechange(this.goodsup.date),
          'heading': this.goodsup.heading,
          'description': this.goodsup.description,
          'stock': this.goodsup.stock,
          'status': 0,
          'sort': this.goodsup.sort,
          'type': this.goodsup.type,
        };
        this.axios({
          method: 'post',
          url: '/gcsweixin/shop/product/update',
          params: {
            productid: this.goodsup.id
          },
          data: this.tijiao
        }).then((res) => {
          this.$message({
            message: '下架成功',
            type: 'success'
          });
          this.getgoods();
        })
      },
      handleDownload() {
        require.ensure([], () => {
          const {export_json_to_excel} = require('vendor/Export2Excel');
          const tHeader = ['编号', '日期', '商品名字', '商品价格', '商品数量']
          const filterVal = ['id', 'date', 'name', 'price', 'stock']
          const list = this.goods
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '实物类商品')

        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
    },

    mounted()
    {
      this.getgoods();
    }
  }
</script>

<style>

</style>
