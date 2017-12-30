<template>
  <el-row>
    <el-col :span="24">
      <el-form :model="SupForm" :rules="rules" ref="SupForm" label-width="150px"
               style="width: 65%;margin: 0 0 80px 0 ">
        <el-form-item label="单品名称 :" prop="name">
          <el-input v-model="SupForm.name"></el-input>
        </el-form-item>
        <el-form-item label="原价 :" prop="old_price">
          <el-input type="number" v-model.number="SupForm.old_price"></el-input>
        </el-form-item>
        <el-form-item label="现价 :" prop="price">
          <el-input type="number" v-model.number="SupForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品首页图 :">
          <el-upload
            class="avatar-uploader"
            action="https://www.embracex.com/gcsweixin/shop/product/uploadimg/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="SupForm.logo" :src="SupForm.logo " class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品详情图 :" style="width: 200%">
          <el-upload
            action="https://www.embracex.com/gcsweixin/shop/product/uploadimg/"
            list-type="picture-card"
            :file-list="fileList"
            :limit="5"
            :on-exceed="handleExceed"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品描述标题 :" style="width: 150%" prop="heading">
          <el-input v-model="SupForm.heading" placeholder="请输入商品的标题描述，不能超过20个字符"></el-input>
        </el-form-item>
        <el-form-item label="商品描述详情 :" prop="description" style="width: 150%;height: 150px">
          <el-input type="textarea" v-model="SupForm.description" :autosize="{ minRows: 5, maxRows: 8}"
                    placeholder="请输入商品的详细描述信息，不能超过100字符"></el-input>
        </el-form-item>
        <el-form-item label="商品库存数目 :" style="width: 200%" prop="stock">
          <el-input v-model="SupForm.stock" style="width: 36%" placeholder="商品的库存数"></el-input>
          <label style="margin: 0 0 0 15px;color: red">不填则默认为：9999999</label>
        </el-form-item>
        <el-form-item label="商品生效日期 :" style="width: 200%" prop="date">
          <el-date-picker
            v-model="SupForm.date"
            type="datetime"
            style="width: 36%"
            placeholder="选择日期时间">
          </el-date-picker>
          <label style="margin: 0 0 0 15px;color: red">产品的有效日期不能早于创建当天的o点</label>
        </el-form-item>
        <el-form-item label="商品排序  :" style="width: 200%" prop="sort">
          <el-input v-model="SupForm.sort" style="width: 36%" placeholder="商品顺序权重"></el-input>
          <label style="margin: 0 0 0 15px;color: red">必须是整数，不传默认为o，权重数字越大越靠前</label>
        </el-form-item>
        <el-form-item style="margin: 50px 0 0 0">
          <el-button style="margin: 0 50px 0 0;" type="primary" @click="submitForm()">保存</el-button>
          <el-button @click="resetForm('SupForm')">返回</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>

  export default {
    data() {
      let oldprice = (rule, value, callback) => {
        if (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) === false) {
          callback(new Error('必须是正数'));
        } else {
          callback();
        }
      };
      let price = (rule, value, callback) => {
        if (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) === false) {
          callback(new Error('必须是正数'));
        } else if (value > this.SupForm.old_price) {
          callback(new Error('现价不能高于原价'));
        }
        else {
          callback();
        }
      };
      let stock = (rule, value, callback) => {
        if (/^[1-9]\d*$/.test(value) === false) {
          callback(new Error('必须是正整数'));
        } else if (value > 9999999) {
          callback(new Error('不能超过9999999'));
        }
        else {
          callback();
        }
      };
      let sort = (rule, value, callback) => {
        if (/^[1-9]\d*$/.test(value) === false) {
          callback(new Error('必须是正整数'));
        } else if (value > 9999999) {
          callback(new Error('不能超过9999'));
        }
        else {
          callback();
        }
      };


      return {
        imageUrl: '',
        dialogImageUrl:'',
        dialogVisible: false,
        imgers: [],
        fileList: [],
        tijiao:{},
        SupForm: {

        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
          ],
          old_price: [
            {required: true, message: '请输入原价',},
            {validator: oldprice, trigger: 'blur'}
          ],
          price: [
            {required: true, message: '请输入现价',},
            {validator: price, trigger: 'blur'}
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
          stock: [
            {validator: stock, trigger: 'blur'}
          ],
          sort: [
            {validator: sort, trigger: 'blur'}
          ],
        },
      };
    },
    methods: {
      getgoods(){
        this.oupid = this.$route.params.id
        this.axios({
          method: 'post',
          url: '/gcsweixin/shop/product/getproduct',
          params: {
            id: this.oupid
          }
        }).then((res) => {
          console.log(res.data);
          this.SupForm = res.data;
          this.fileList =this.tpjq(this.SupForm.image);
        })

      },
      submitForm() {
        if (this.SupForm.stock === '') {
          this.SupForm.stock = 9999999;
        }
        if (this.SupForm.sort === '') {
          this.SupForm.sort ='0';
        }
        if(this.SupForm.name!=''&&this.SupForm.old_price!=''&&this.SupForm.price!=''
          &&this.SupForm.date!=''&&this.SupForm.heading!=''&&this.SupForm.description!=''){
          this.tijiao={
            'name': this.SupForm.name,
            'old_price': this.SupForm.old_price,
            'price': this.SupForm.price,
            'logo': this.SupForm.logo,
            'image': this.SupForm.image,
            'date': this.SupForm.date,
            'heading': this.SupForm.heading,
            'description': this.SupForm.description,
            'stock': this.SupForm.stock,
            'status': this.SupForm.status,
            'sort':this.SupForm.sort,
            'type': this.SupForm.type,
          };
          this.axios({
            method: 'post',
            url: '/gcsweixin/shop/product/update',
            params:{
              productid: this.oupid
            },
            data: this.tijiao
          }).then((res) => {
            this.$router.push({path: '/gservice'});
            this.$message({
              message: '恭喜你修改成功',
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

      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      tpjq(qaq) {
        let img = qaq;
        let imgjq = img.substring(0, img.length - 1);
        let imgs = imgjq.split(',');
        let geshi = [];

        for (let i = 0; i < imgs.length; i++) {
          let qa = imgs[i];
          let qaa = qa.split('.');
          geshi.push(qaa[qaa.length - 1]);
        }

        let images = [];
        for (let i = 0; i < imgs.length; i++) {
          images.push({name: i + 1 + '.' + geshi[i], url: imgs[i]})
        }
        return images;
      }
    },

    mounted(){
      this.getgoods();
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
