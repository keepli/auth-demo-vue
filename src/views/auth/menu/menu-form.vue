<template>
  <el-dialog  :visible.sync="visible" width="550px">
    <el-form ref="dataForm" :inline="true" label-position="right" :rules="rules" :model="form" label-width="80px"
             size="small" style="width: 400px; margin-left:10px;">
      <el-form-item label="菜单类型" size="small" >
        <el-radio-group v-model="form.type" class="form-in-width-a">
          <el-radio-button :label="0">目录</el-radio-button>
          <el-radio-button :label="1">菜单</el-radio-button>
          <el-radio-button :label="2">按钮</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单标题" prop="title">
        <el-input v-model="form.title"  class="form-in-width-a"/>
      </el-form-item>
      <el-form-item label="组件名称" prop="name">
        <el-input v-model="form.name" placeholder="匹配组件内Name字段" class="form-in-width-a"/>
      </el-form-item>
      <el-form-item label="系统图标" prop="icon">
        <el-input v-model="form.icon" placeholder="请输入系统图标" class="form-in-width-a"/>
      </el-form-item>
      <el-form-item label="权限标识" prop="permission">
        <el-input v-model="form.permission" placeholder="格式：xx:xx 例如：user:add" class="form-in-width-a"/>
      </el-form-item>
      <el-form-item label="菜单排序" prop="sort">
        <el-input-number v-model.number="form.sort" :min="0" :max="999" controls-position="right" class="form-in-width-a"/>
      </el-form-item>
      <el-form-item label="路由地址" prop="path">
        <el-input v-model="form.path" placeholder="格式：user/add 注：第一个/不加" class="form-in-width-a"/>
      </el-form-item>
      <el-form-item label="组件路径" prop="component">
        <el-input v-model="form.component" placeholder="请输入组件地址" class="form-in-width-a"/>
      </el-form-item>
      <el-form-item label="上级类目" prop="pid">
        <treeselect
          v-model="form.pid"
          :options="trees"
          class="form-in-width-a"
          placeholder="选择上级类目"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">
        取消
      </el-button>
      <el-button type="primary" :disabled="saveBtnDisabled" @click="formSubmit">
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import menu from '@/api/auth/menu'
import Treeselect from "@riophae/vue-treeselect"
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

const defaultForm = {
  id: undefined,
  type: 0,
  title: '',
  name: '',
  sort: 999
}

export default {
  name: "Menu",
  components: {Treeselect},
  data() {
    return {
      // 要列出表单所有字段，否则resetFields导致输入无效
      form: {
        id: undefined,
        type: 0,
        title: undefined,
        name: undefined,
        icon: undefined,
        permission: undefined,
        sort: 999,
        path: undefined,
        component: undefined,
        pid: undefined,
      },
      visible: false,
      saveBtnDisabled: false, // 保存按钮是否禁用
      showReviewer: false,
      textMap: {
        update: '修改菜单',
        create: '新增菜单'
      },
      rules: {
        title: [{required: true, message: '菜单标题不能为空', trigger: 'blur'}]
      },
      dialogStatus: '',
      trees: []
    }
  },
  created() {
    this.getMenuDropdown()
  },
  methods: {
    init(isEdit, id) {
      this.visible = true;
      this.saveBtnDisabled = false
      this.getMenuDropdown();
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();//重置表单
        if (id != null) {
          this.form.pid = id;
        }
        if (isEdit) {
          console.log('修改方法执行')
          this.getById(id)
        } else {
          console.log('新增方法执行')
          this.form.id = undefined;
        }
      });
    },
    formSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (this.form.pid === undefined) {
            this.form.pid = 0;
          }

          if (this.form.id) {
            this.update()
          } else {
            this.create()
          }
        }
      });
    },
    create() {
      this.saveBtnDisabled = true
      menu.create(this.form).then(response => {
        if (response.success === true) {
          this.$message.success("添加成功");
          this.visible = false;
          this.$emit("refreshDataList");
        }
      })
    },
    update() {
      this.saveBtnDisabled = true
      menu.alter(this.form).then(response => {
        if (response.success === true) {
          this.$message.success("修改成功");
          this.visible = false;
          this.$emit("refreshDataList");
        }
      })
    },
    getMenuDropdown() {
      console.log('获取菜单下拉列表')
      menu.getMenuDropdown().then(response => {
        if (response.success === true) {
          this.trees = response.data.data
          console.log(this.trees)
        }
      })
    },
    getById(id) {
      menu.getById(id).then(response => {
        if (response.success === true) {
          this.form = response.data.data
        }
      })
    }
  }
}
</script>

<style scoped>
.form-in-width-a{
  width: 250px;
}
</style>
