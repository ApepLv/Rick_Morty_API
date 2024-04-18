import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Layout, Menu } from 'antd'
import { Footer, Header } from 'antd/es/layout/layout'


export const Route = createRootRoute({
component: Rooter

})


function Rooter () {

const items = new Array(3).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
}));

  return (
    <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{' '}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
    </div>
    <hr />

    <Layout>
              <Header
                  style={{
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                  }}
              >
                  <div className="demo-logo" />
                  <Menu
                      theme="dark"
                      mode="horizontal"
                      defaultSelectedKeys={['2']}
                      items={items}
                      style={{
                          flex: 1,
                          minWidth: 0,
                      }}
                  />
              </Header>

              <Outlet />
              <Footer
                  style={{
                      textAlign: 'center',
                  }}
              >
                  Ant Design ©{new Date().getFullYear()} Created by Ant UED
              </Footer>
          </Layout>

    <TanStackRouterDevtools />
  </>
  )
}