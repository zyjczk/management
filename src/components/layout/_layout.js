import axios from '@/api/api'

export default {
  data: function () {
    return {
      activeName: '0',
      breadList: [],
      manager: JSON.parse(sessionStorage.getItem('manager'))
    }
  },
  methods: {
    logout () {
      axios({
        method: 'POST',
        url: 'api/manager/managerinfo/logout'
      })
        .then(res => {
          if (res.data.code === 10000) {
            this.$message.success('退出成功！')
            sessionStorage.clear()
            this.$router.push({ path: '/' })
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
    },
    getBreadList: function () {
      const { matched } = this.$route
      let breads = []
      matched.map(items => {
        let bread = {}
        bread.name = items.meta.breadName
        bread.path = items.path
        items.meta.breadName && breads.push(bread)
      })
      return breads
    }
  },
  created () {
    const menusStr = sessionStorage.getItem('menus')
    if (!menusStr) {
      this.$message.error('您没有任何菜单权限！')
    }

    const menus = JSON.parse(menusStr)
    let maxLevel = 0
    menus.forEach(item => {
      if (item.permissions_level > maxLevel) {
        maxLevel = item.permissions_level
      }
    })

    // const menusObj = {}
    // let num = 0
    // while (menus.length > 0) {
    //   for (let i=0;i<menus.length; i++) {

    //   }

    //   if (num < maxLevel) {
    //     num++
    //   }
    // }
  },
  mounted () {
    this.breadList = this.getBreadList()
  }
}
