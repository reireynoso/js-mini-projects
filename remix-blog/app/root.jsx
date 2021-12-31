import { Outlet, LiveReload, Link } from "remix";

export default function App(){
  return (
    <Document>
      <Layout>
        <Outlet/>
      </Layout>
    </Document>
  )
}

function Document({children, title}){
  return (
    <html>
      <head>
        <title>{title ? title : "Remix Blog" }</title>
      </head>

      <body>
        {children}
        {
          process.env.NODE_ENV === 'development' ? <LiveReload/> : null
        }
      </body>
    </html>
  )
}

function Layout({children}){
  return (
    <>
      <nav className="navbar">
        <Link to='/' className="logo">
          Remix
        </Link>

        <ul>
          <li>
            <Link to="/posts">
              Posts
            </Link>
          </li>
        </ul>
      </nav>

      <div className="container">
        {children}
      </div>
    </>
  )
}