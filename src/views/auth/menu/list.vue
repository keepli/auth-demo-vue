<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-button
        class="button-a"
        size="mini"
        type="success"
        @click="addOrUpdateHandle(false)">
        新增
      </el-button>
    </el-row>
    <el-row :gutter="20">
      <el-table
        :data="menus"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="title"
          label="菜单标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="标签"
          width="100">
          <template slot-scope="scope">
            <el-tag
              :type="getTagType(scope.row.type)"
              disable-transitions>
              {{ scope.row.type === 0 ? '目录' : '' }}
              {{ scope.row.type === 1 ? '菜单' : '' }}
              {{ scope.row.type === 2 ? '按钮' : '' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          width="180">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路由地址">
        </el-table-column>
        <el-table-column
          prop="component"
          label="组件路径">
        </el-table-column>
        <el-table-column
          prop="permission"
          label="权限标识">
        </el-table-column>
        <el-table-column
          prop="name"
          label="组件名称">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="图标">
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-plus"
              @click="addOrUpdateHandle(false,scope.row.id)">添加
            </el-button>
            <el-button type="text"
                       icon="el-icon-edit"
                       @click="addOrUpdateHandle(true,scope.row.id)">修改
            </el-button>
            <el-button type="text" icon="el-icon-delete" @click="remove(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--弹框组件-->
    <table-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getAll"></table-form>
  </div>
</template>
<script>
import menu from '@/api/auth/menu'
import TableForm from './menu-form'

export default {
  components: {TableForm},
  data() {
    return {
      menus: [],
      addOrUpdateVisible: false,
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      menu.getAll().then(response => {
        if (response.success === true) {
          this.menus = response.data.data
          console.log('菜单：' + response.data.data)
        }
      })
    },
    getTagType(type) {
      let tagtype = ''
      if (type === 1) {
        tagtype = 'success'
      } else if (type === 2) {
        tagtype = 'warning'
      }
      return tagtype
    },
    addOrUpdateHandle(isEdit, id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(isEdit, id)
      })
    },
    remove(id) {
      menu.remove(id).then(response => {
        if (response.success === true) {
          this.$message.success("删除成功");
          this.getAll()
        }
      })
    }
  },
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
