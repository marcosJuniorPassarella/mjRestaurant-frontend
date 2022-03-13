import { useContext } from 'react';
import Link from 'next/link'
import { AuthContext } from '../../contexts/AuthContext';
import { FiLogOut } from 'react-icons/fi'
import styles from './styles.module.scss'


export function Header() {
    const { signOut } = useContext(AuthContext);
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logo.svg" alt="Logo MjRestaurant" width={190} height={60} />
                </Link>
                <nav className={styles.navMenu}>
                    <Link href="/category">
                        <a>Categoria</a>
                    </Link>
                    <Link href="/product">
                        <a>Produtos</a>
                    </Link>
                    <button onClick={signOut}>
                        <FiLogOut color='#fff' size={24} />
                    </button>
                </nav>
            </div>
        </header>
    )
}
