<template>
  <div class="app-container">
    <el-row>
      <el-form ref="data" :model="data" :rules="validateRules" label-width="80px">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="data.name" class="input-a"></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="code">
          <el-input v-model="data.code" class="input-a"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="data.remark" class="input-a"></el-input>
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
import role from '@/api/auth/role'

const itemUrl = '/auth/role'
const defaultData = {}

export default {
  data() {
    return {
      data: defaultData,
      validateRules: {
        name: [{ required: true, trigger: 'blur', message: '角色名必须输入' }],
        code: [{ required: true, trigger: 'blur', message: '角色编号必须输入' }],
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
      role.create(this.data).then(response => {
        if (response.success === true) {
          this.toList()
        }
      })
    },
    update() {
      role.alter(this.data).then(response => {
        if (response.success === true) {
          this.toList()
        }
      })
    },
    cancel() {
      this.toList()
    },
    fetchById(id){
      role.getById(id).then(response => {
        if (response.success === true) {
          this.data = response.data.data
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
