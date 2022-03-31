<template>
  <div class="app-container">
    <el-row :gutter="20">
        <el-input
          v-model="page.data.username"
          placeholder="请输入用户名"
          size="small"
          class="input-a"
        ></el-input>
        <el-input
          v-model="page.data.nickname"
          placeholder="请输入昵称"
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
        :data="userList"
        stripe
        style="width: 100%">
        <el-table-column
          fixed
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="180">
          <template slot-scope="scope">
            {{ scope.row.sex === 1 ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="enable"
          label="启用状态"
          width="180">
          <template slot-scope="scope">
            {{ scope.row.enable === 1 ? '启用' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          width="250">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="250">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="头像">
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
import user from '@/api/auth/user'

const userUrl = '/auth/user'

export default {
  data() {
    return {
      page: {
        current: 1,
        size: 10,
        total: 100,
        data: {}
      },
      userList: [],
      userData: {}
    }
  },
  created() {
    this.getByPage()
  },
  methods: {
    getByPage() {
      user.getByPage(this.page).then(response => {
        if (response.success === true) {
          // debugger
          this.userList = response.data.data
          this.page.size = parseInt(response.data.size)
          this.page.total = parseInt(response.data.total)
          console.log(this.userList)
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
      this.$router.push({path: `${userUrl}/add`})
    },
    remove(id) {
      user.remove(id).then(response => {
        if (response.success === true) {
          this.getByPage()
        }
      })
    },
    edit(id) {
      this.$router.push({path: `${userUrl}/edit/${id}`})
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
