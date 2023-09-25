import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Navigation() {
  return (
    <>
    <nav>
        <section>
          <Link to='/'><h1>O GALLERY</h1></Link>
        </section>
        <ul>
          <Link to='/gallery'>VISIT GALLERY</Link>
          <li><a target='_blank' href='https://oceanwaring.netlify.app/'>PORTFOLIO</a></li>
          <Link to='/checkout'>CHECKOUT</Link>
        </ul>
    </nav>

    <Outlet/>
    </>
  )
}
