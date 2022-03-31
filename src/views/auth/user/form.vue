<template>
  <div class="app-container">
    <el-row>
      <el-form ref="data" :model="data" :rules="validateRules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="data.username" class="input-a"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="data.nickname" class="input-a"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="data.password" show-password class="input-a"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="data.phone" class="input-a"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="data.email" class="input-a"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="data.sex">
            <el-radio :label="1" class="redio-a">男</el-radio>
            <el-radio :label="2" class="redio-a">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="data.enable">
            <el-radio :label="1" class="redio-a">启用</el-radio>
            <el-radio :label="2" class="redio-a">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="data.icon" class="input-b"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="saveBtnDisabled" @click="insertOrUpdate">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import user from '@/api/auth/user'

const validatePass = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码不能小于6位'))
  } else {
    callback()
  }
}

const itemUrl = '/auth/user'
const defaultData = {
  sex: 1,
  enable: 1
}

export default {
  data() {
    return {
      data: defaultData,
      validateRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名必须输入' }],
        nickname: [{ required: true, trigger: 'blur', message: '昵称必须输入' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
    }
  },
  created() {
    console.log('form created ......')
    this.init()
  },
  methods: {
    init() {
      // debugger
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchById(id)
      } else {
        // 对象拓展运算符：拷贝对象，而不是赋值对象的引用
        this.data = { ...defaultData }
      }
    },
    insertOrUpdate() {
      this.$refs.data.validate(valid => {
        if (valid) {
          this.saveBtnDisabled = true // 防止表单重复提交
          if (!this.data.id) {
            this.insert()
          } else {
            this.update()
          }
        }
      })
    },
    insert() {
      console.log('新增用户、')
      user.create(this.data).then(response => {
        if (response.success === true) {
          this.toList()
        }
      })
    },
    update() {
      user.alter(this.data).then(response => {
        if (response.success === true) {
          this.toList()
        }
      })
    },
    cancel() {
      this.toList()
    },
    fetchById(id){
      user.getById(id).then(response => {
        if (response.success === true) {
          this.data = response.data.data
          // 该密码不会修改原密码
          this.data.password = '******'
        }
      })
    },
    toList(){
      this.$router.push({ path: `${itemUrl}`})
    }
  }
}
</script>

<style scoped>
.input-a {
  width: 300px;
}
.input-b {
  width: 500px;
}
.redio-a {
  width: 60px;
}
</style>
