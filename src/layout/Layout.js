import React from 'react';
import Header from './Header/Header';
import '../styles/layout/Layout.css';

function Layout({ title, children }) {
    return (
        <div className='layout'>
            <Header />
            <main className='layout__main'>
                <section className='layout__main--section'>
                    {children}
                </section>
            </main>
        </div>
    )
}

export default Layout
