import Cookie from 'js-cookie'

const tab =  {
    namesapce:true,
    state: {
        isCollapse: false, //控制菜单的展开或收起
        // 面包屑的数据
        tabList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ],
        // 菜单栏数据
        menu:[],
    },
    actions: {
        collapseMenu(context,value){
            context.commit('COLLAPSE_MENU',value)
        },
        selectMenu(context,value){
            context.commit('SELECT_MENU',value)
        },
        closeTag(context,value){
            context.commit('CLOSE_TAG',value)
            // console.log(value.name,"value")
        },
    },
    mutations: {
        COLLAPSE_MENU(state){
            state.isCollapse = !state.isCollapse;
        },
        SELECT_MENU(state,value) {
            if (value.name !== 'home'){
                const index = state.tabList.findIndex(tab => tab.name === value.name);
                if (index === -1){
                    state.tabList.push(value);
                }
            }
            // state.tabList.forEach((tab)=>{
            //     console.log(tab)
            // })
        },
        CLOSE_TAG(state,value) {
            // state.tablist = state.tabList.filter(function(tab){
            //     console.log(tab.name !== value.name,value.name);
            //     return tab.name !== value.name;
            // })
            // state.tabList.forEach((tab) => {
            //     console.log(tab,tab.name)
            // })

            const index = state.tabList.findIndex(tab => tab.name === value.name)
            state.tabList.splice(index, 1)
        },
        // 获取menu数据
        SET_MENU(state, value) {
            state.menu = value
            // 将菜单数据存储到cookie中，共不同页面之间通信
            Cookie.set('menu',JSON.stringify(value))
        },
        // 动态注册路由
        ADD_ROUTERS(state, router){
            // 判断缓存中是否有数据
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu

            // 组装动态路由的数据
            const menuArry = []
            menu.forEach((item) => {
                if (item.children){
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArry.push(...item.children)
                }else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArry.push(item)
                }
            })
            // console.log(menuArry)
            
            //路由的动态添加
            menuArry.forEach((item) => {
                router.addRoute('Main',item)
            })
        }
    }
}

export default tab