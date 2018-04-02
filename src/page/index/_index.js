import axios from '@/api/api'

export default {
  name: 'list',
  data: function () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.changPasswordModel.repassword !== '') {
          this.$refs.changPassword.validateField('repassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.changPasswordModel.newpassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      activityList: [],
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0,
      userNum: 0,
      activityNum: 0,
      manager: JSON.parse(sessionStorage.getItem('manager')),
      userCount: 0,
      activityCounts: 0,
      dialogVisible: false,
      changPasswordModel: { oldPassword: '', newpassword: '', repassword: '' },
      changPasswordRules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newpassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        repassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getActivityList: function () {
      axios({
        method: 'GET',
        url:
          'api/activity/activityinfo/list/page/' +
          this.currentPage +
          '/pagesize/' +
          this.pageSize
      })
        .then(res => {
          if (res.data.code === 10000) {
            this.activityList = res.data.data.list
            this.pageTotal = Math.ceil(res.data.data.counts / this.pageSize)
            this.userCount = res.data.data.user_counts
            this.activityCounts = res.data.data.activity_run_counts
          } else {
            if (res.data.msg) {
              this.$message.error(res.data.msg)
            } else {
              this.$message.error('数据获取失败！')
            }
          }
        })
        .catch(e => {
          this.$message.error('接口获取失败！')
        })
    },
    changePageSize: function (num) {
      this.pageSize = num
      this.getActivityList()
    },
    changeCurrentPage: function (num) {
      this.currentPage = num
      this.getActivityList()
    },
    postChangPassword: function () {
      this.$refs['changPassword'].validate(valid => {
        if (valid) {
          axios({
            method: 'POST',
            url: 'api/manager/managerinfo/modifypwd',
            data: {
              manager_pwd: this.changPasswordModel.oldPassword,
              new_manager_pwd: this.changPasswordModel.newpassword
            }
          })
            .then(res => {
              if (res.data.success) {
                this.$message.success('数据提交成功！')
              } else {
                if (res.data.msg) {
                  this.$message.error(res.data.msg)
                } else {
                  this.$message.error('数据提交失败！')
                }
              }
            })
            .catch(e => {
              this.$message.error('接口提交失败！')
            })
        } else {
          this.$message.error('请验证信息!!')
          return false
        }
      })
    },
    resetChangPassword () {
      this.$refs['changPassword'].resetFields()
    },
    changePassword () {}
  },
  created () {
    this.getActivityList()
  }
}
