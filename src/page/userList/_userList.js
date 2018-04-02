import axios from '@/api/api'

export default {
  name: 'list',
  data: function () {
    return {
      bindRadio: 1,
      queryType: '',
      queryName: '',
      queryOptions: [
        {
          value: 'user_name',
          label: '用户姓名'
        },
        {
          value: 'user_phone',
          label: '手机号'
        }
      ],
      userList: []
    }
  },
  methods: {
    tableCenter: function () {
      return 'table-center'
    },
    getUserList: function () {
      let url = 'api/user/get/list/is_bound/' + this.bindRadio
      if (this.queryType && this.queryName) {
        url += '/' + this.queryType + '/' + this.queryName
      }
      axios({
        method: 'GET',
        url: url
      })
        .then(res => {
          console.log(res)
          if (res.data.code === 10000) {
            this.userList = res.data.data.list
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error('获取数据失败')
        })
    }
  },
  created () {
    this.getUserList()
  }
}
