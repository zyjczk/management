import axios from '@/api/api'
import { mapMutations } from 'vuex'

export default {
  name: 'login',
  data: function () {
    return {
      loginFormModel: { userName: '', password: '' },
      loginFormRules: {
        userName: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations({
      setMenus: 'SET_MENUS_LIST',
      setManager: 'SET_MANAGER_INFO'
    }),
    postForm: function () {
      this.$refs['loginForm'].validate(valid => {
        console.log(valid)
        if (valid) {
          axios({
            method: 'POST',
            url: 'api/manager/managerinfo/login',
            data: {
              manager_login_name: this.loginFormModel.userName,
              manager_pwd: this.loginFormModel.password
            }
          })
            .then(res => {
              if (res.data.code === 10000) {
                sessionStorage.setItem('token', res.headers['x-auth-token'])
                this.$message.success('登录成功！')
                // 存储manager数据
                sessionStorage.setItem(
                  'manager',
                  JSON.stringify(res.data.data.managerinfo)
                )
                // 存储menu数据
                sessionStorage.setItem(
                  'menus',
                  JSON.stringify(res.data.data.menus)
                )

                this.$router.push({ path: 'main' })
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
    }
  }
}
