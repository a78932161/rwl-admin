<template>
  <el-row>
    <el-col :span="24">
      <el-form :model="SaddForm" :rules="rules" ref="SaddForm" label-width="150px"
               style="width: 65%;margin: 0 0 80px 0 ">
        <el-form-item label="单品名称 :" prop="name">
          <el-input v-model="SaddForm.name"></el-input>
        </el-form-item>
        <el-form-item label="原价 :" prop="old_price">
          <el-input type="number"  v-model.number="SaddForm.old_price"></el-input>
        </el-form-item>
        <el-form-item label="现价 :" prop="price">
          <el-input type="number" v-model.number ="SaddForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品首页图 :">
          <el-upload
            class="avatar-uploader"
            action="https://www.embracex.com/gcsweixin/shop/product/uploadimg/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="SaddForm.logo" :src="SaddForm.logo " class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品详情图 :" style="width: 200%">
          <el-upload
            action="https://www.embracex.com/gcsweixin/shop/product/uploadimg/"
            list-type="picture-card"
            :limit="5"
            :on-exceed="handleExcee"
            :on-success="handlechange"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品描述标题 :" style="width: 150%" prop="heading">
          <el-input v-model="SaddForm.heading" placeholder="请输入商品的标题描述，不能超过20个字符"></el-input>
        </el-form-item>
        <el-form-item label="商品描述详情 :" prop="description" style="width: 150%;height: 150px">
          <el-input type="textarea" v-model="SaddForm.description" :autosize="{ minRows: 5, maxRows: 8}"
                    placeholder="请输入商品的详细描述信息，不能超过100字符"></el-input>
        </el-form-item>
        <el-form-item label="商品库存数目 :" style="width: 200%" prop="stock">
          <el-input v-model="SaddForm.stock" style="width: 36%" placeholder="商品的库存数"></el-input>
          <label style="margin: 0 0 0 15px;color: red">不填则默认为：9999999</label>
        </el-form-item>
        <el-form-item label="商品生效日期 :" style="width: 200%" prop="date">
          <el-date-picker
            v-model="SaddForm.date"
            type="datetime"
            style="width: 36%"
            placeholder="选择日期时间">
          </el-date-picker>
          <label style="margin: 0 0 0 15px;color: red">产品的有效日期不能早于创建当天的o点</label>
        </el-form-item>
        <el-form-item label="商品排序  :" style="width: 200%" prop="sort">
          <el-input v-model="SaddForm.sort" style="width: 36%" placeholder="商品顺序权重"></el-input>
          <label style="margin: 0 0 0 15px;color: red">必须是整数，不传默认为o，权重数字越大越靠前</label>
        </el-form-item>
        <el-form-item label="商家名称 :" style="width: 94%" prop="seller">
          <el-input v-model="SaddForm.seller" placeholder="请输入商家名称"></el-input>
        </el-form-item>
        <el-form-item style="margin: 50px 0 0 0">
          <el-button style="margin: 0 50px 0 0;" type="primary" @click="submitForm()">保存</el-button>
          <el-button @click="resetForm('SaddForm')">返回</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>

  export default {
    data() {
      let oldprice = (rule, value, callback) => {
        if (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)===false ) {
          callback(new Error('必须是正数'));
        } else {
          callback();
        }
      };
      let price = (rule, value, callback) => {
        if (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)===false ) {
          callback(new Error('必须是正数'));
        }else if(value>this.SaddForm.old_price){
          callback(new Error('现价不能高于原价'));
        }
        else {
          callback();
        }
      };
      let stock = (rule, value, callback) => {
        if (/^[1-9]\d*$/.test(value)===false ) {
          callback(new Error('必须是正整数'));
        }else if(value>9999999){
          callback(new Error('不能超过9999999'));
        }
        else {
          callback();
        }
      };
      let sort = (rule, value, callback) => {
        if (/^[0-9]\d*$/.test(value)===false ) {
          callback(new Error('必须是正整数'));
        }else if(value>9999999){
          callback(new Error('不能超过9999'));
        }
        else {
          callback();
        }
      };


      return {
        imageUrl:'',
        dialogImageUrl:'',
        dialogVisible: false,
        tijiao:{},
        imgg:[],
        SaddForm: {
          name: '',
          old_price: '',
          price: '',
          logo: '',
          date: '',
          image: '',
          heading: '',
          description: '',
          stock: '',
          sort:'',
          status: 1,
          type: 2,
          seller:''
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
          ],
          old_price: [
            {required: true, message: '请输入原价', },
            {validator:oldprice,trigger: 'blur' }
          ],
          price: [
            {required: true, message: '请输入现价', },
            {validator:price,trigger: 'blur' }
          ],
          heading: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {max: 20, message: '不能大于20个字符', trigger: 'blur'}
          ],
          date: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          description: [
            {required: true, message: '请输入商品描述', trigger: 'blur'},
            {max: 100, message: '不能大于100个字符', trigger: 'blur'}
          ],
          stock:[
            {validator:stock,trigger: 'blur' }
          ],
          sort:[
            {validator:sort,trigger: 'blur' }
          ],
          seller:[
            {required: true, message: '请输入商家', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'},
          ],
        },
      };
    },
    methods: {

      submitForm() {
        if (this.SaddForm.stock === '') {
          this.SaddForm.stock = 9999999;
        }
        if (this.SaddForm.sort === '') {
          this.SaddForm.sort =0;
        }
        if(this.SaddForm.name!=''&&this.SaddForm.old_price!=''&&this.SaddForm.price!=''
          &&this.SaddForm.date!=''&&this.SaddForm.heading!=''&&this.SaddForm.description!=''){
          this.tijiao={
            'name': this.SaddForm.name,
            'old_price': this.SaddForm.old_price,
            'price': this.SaddForm.price,
            'logo': this.SaddForm.logo,
            'image': this.imgg.toString(),
            'date': this.SaddForm.date.getTime(),
            'heading': this.SaddForm.heading,
            'description': this.SaddForm.description,
            'stock': this.SaddForm.stock,
            'status': this.SaddForm.status,
            'sort':this.SaddForm.sort,
            'type': this.SaddForm.type,
          };
          this.axios({
            method: 'post',
            url: '/gcsweixin/shop/product/save',
            data: this.tijiao,
          }).then((res) => {
            this.$router.push({path: '/gservice'});
            this.$message({
              message: '恭喜你添加成功',
              type: 'success'
            });
          })
        }else{
          this.$message.error('请填写完整');

        }

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$router.push({path: '/gservice'});
      },
      handleRemove(file, fileList) {

        Array.prototype.remove = function(val) {
          let index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };
        this.imgg.remove(file.response.data);

        console.log(this.imgg);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccess(response) {
        this.SaddForm.logo=response.data;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handlechange(file, fileList){

        this.imgg.push(file.data)

        console.log(this.imgg);
      },
      handleExcee(files, fileList) {
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
    },
    mounted(){

    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
