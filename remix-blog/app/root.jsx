import { Outlet, LiveReload, Link, Links, Meta } from "remix";
import globalStylesUrl from './styles/globals.css';

export const links = () => [{rel: 'stylesheet', href: globalStylesUrl}]
export const meta = () => {
  const description = 'A blog built with Remix';
  const keywords = 'remix, react, javascript';

  return {
    description,
    keywords
  }
}
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
        <Links/>
        <Meta/>
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