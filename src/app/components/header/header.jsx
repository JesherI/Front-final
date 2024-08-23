import './header.css';
import Image from 'next/image';
function Header() {
    return (
        <header className="header">
            <div className='conetnt-logo-con-fecha'>
                <a href="/">
                <img src="/logo.png" alt="logo-ico" />
                </a>
            </div>
            <div className="content-logo-icon">
                <img src="/logo-con-fecha.png" alt="Logo-fecha" />
            </div>
        </header>
    )
}

export default Header;
