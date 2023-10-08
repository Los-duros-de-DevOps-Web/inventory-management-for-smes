import Image from 'next/image'
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import LoginPage from './login/page';
export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <BrowserRouter>  
			  	<nav>
            		<ul>
              			<li>
                			<Link to="/">Home</Link>
              			</li>
              			<li>
                			<Link to="/about">About</Link>
              			</li>	
            		</ul>
          		</nav>
	
          		<Routes>
            		<Route path="/" element={<Home />} />
            		<Route path="/login" element={<LoginPage />} />
          		</Routes>
        	</BrowserRouter> 
    </div>
  )
}
