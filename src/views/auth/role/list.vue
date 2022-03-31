<template>
  <div class="app-container">
    <el-row :gutter="20">
        <el-input
          v-model="page.data.name"
          placeholder="请输入角色名"
          size="small"
          class="input-a"
        ></el-input>
        <el-input
          v-model="page.data.code"
          placeholder="请输入角色编号"
          size="small"
          class="input-a"
        ></el-input>
        <el-button
          class="button-a"
          size="mini"
          type="success"
          @click="getByPage">
          查询
        </el-button>
        <el-button
          class="button-a"
          size="mini"
          type="warning"
          @click="clear">
          重置
        </el-button>
    </el-row>
    <el-row :gutter="20">
      <el-table
        :data="roleList"
        stripe
        style="width: 100%">
          <el-table-column
            fixed
            type="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="code"
            label="角色编码"
            width="180">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="create" circle></el-button>
              <el-button type="warning" icon="el-icon-edit" size="small" @click="edit(scope.row.id)" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" size="small" @click="remove(scope.row.id)"
                         circle></el-button>
            </template>
          </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-sizes="[10, 20, 40, 80, 100]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import role from '@/api/auth/role'

const roleUrl = '/auth/role'

export default {
  data() {
    return {
      page: {
        current: 1,
        size: 10,
        total: 100,
        data: {}
      },
      roleList: [{
        id: -1,
      }],
      userData: {}
    }
  },
  created() {
    this.getByPage()
  },
  methods: {
    getByPage() {
      role.getByPage(this.page).then(response => {
        if (response.success === true) {
          // debugger
          this.roleList = response.data.data
          this.page.size = parseInt(response.data.size)
          this.page.total = parseInt(response.data.total)
        }
      })
    },
    clear() {
      this.page.data = {}
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    create() {
      this.$router.push({path: `${roleUrl}/add`})
    },
    remove(id) {
      role.remove(id).then(response => {
        if (response.success === true) {
          this.getByPage()
        }
      })
    },
    edit(id) {
      this.$router.push({path: `${roleUrl}/edit/${id}`})
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.input-a {
  width: 300px;
  margin: 5px;
}
.button-a{
  margin: 5px;
}
</style>
