import axios from '@/api/api'

export default {
  name: 'list',
  data: function () {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        // if (this.changPasswordModel.repassword !== '') {
        //   this.$refs.changPassword.validateField('repassword')
        // }
        callback()
      }
    }

    return {
      roleName: 1, // 默认查询的角色类型
      pageSize: 10, // 默认的每页条数
      page: 1, // 当前页,默认的初始页数1
      pageTotal: 1, // 总页数
      role_id: -1, // 默认的查询角色条件
      managerinfoList: [], // 角色列表
      dialogEditVisible: false, // 编辑管理员对话框
      editMananger: { manangerName: '', loginName: '', role: '' }, // 编辑管理员对话框内容
      editManangerRules: {
        // 编辑管理员对话框校验规则
        manangerName: [
          { required: true, message: '*此项不能为空!', trigger: 'blur' }
        ],
        loginName: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
        role: [{ required: true, message: '*此项不能为空!', trigger: 'change' }]
      },
      roleList: [] // 角色选择列表
    }
  },
  methods: {
    test: function () {},
    // 查询列表数据
    getTableItems: function () {
      axios({
        url:
          'api/manager/managerinfo/list/page/' +
          this.page +
          '/pagesize/' +
          this.pageSize +
          '/role_id/' +
          this.role_id,
        method: 'get'
      })
        .then(res => {
          if (res.data.code === 10000) {
            this.managerinfoList = res.data.data.list
            this.pageTotal = res.data.data.counts
          } else {
            this.$message.error(res.data.msg ? res.data.msg : '数据获取失败！')
          }
        })
        .catch(e => {
          this.$message.error('接口获取失败！')
        })
    },
    // 打开编辑角色框
    openDialogEditVisible: function (obj) {
      // axios({
      //   url:""
      // })
      console.log(obj)
      if (obj) {
        this.editMananger.manangerName = obj.manager_name
        this.editMananger.loginName = obj.manager_login_name
        this.editMananger.role = obj.role_id
      }
      this.dialogEditVisible = true
    },
    // 获取角色列表
    getRoleList: function () {
      axios({
        url: 'api/role/roleinfo/roles',
        method: 'get'
      }).then(res => {
        console.log(res.data.data)
        this.roleList = res.data.data
      })
    },
    // 分页
    changePageSize: function (num) {
      this.pageSize = num
      this.getTableItems()
    },
    changeCurrentPage: function (num) {
      this.currentPage = num
      this.getTableItems()
    },
    // 提交角色改动
    eidtManangerCommit: function () {
      this.$refs['editMananger'].validate(valid => {
        if (valid) {
          axios({
            url: 'api/manager/managerinfo/modify',
            method: 'post',
            data: {
              manager_login_name: this.editMananger.loginName,
              manager_name: this.editMananger.manangerName,
              role_id: parseInt(this.editMananger.role)
            }
          }).then(res => {
            if (res.data.code === 10000) {
            }
          })
        } else {
          this.$message.error('请检查填写信息!!')
          return false
        }
      })
    }
  },
  created () {
    this.getTableItems()
    this.getRoleList()
  }
}
