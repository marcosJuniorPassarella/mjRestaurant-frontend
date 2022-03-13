import Head from "next/head"
import { Header } from '../../components/Header/index';
import styles from './styles.module.scss'
import { useState, FormEvent } from 'react';
import { setupAPIClient } from '../../services/api';
import { toast } from "react-toastify";
import { canSSRAuth } from '../../utils/canSSRAuth';

export default function Category() {
    const [category, setCategory] = useState('')

    async function handleRegister(e: FormEvent) {
        e.preventDefault();
        if (category === '') {
            toast.warning('Preencha o campo corretamente')
            return;
        }
        const apiClient = setupAPIClient();
        apiClient.post('/category', {
            name: category
        })
        toast.success('Categoria cadastrada com sucesso!')
        setCategory('')
    }

    return (
        <>
            <Head>
                <title>MjRestaurant - Nova Categoria</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container} >
                    <h1>Cadastrar categoria</h1>
                    <form className={styles.form} onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Digite o nome da categoria"
                            className={styles.input}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <button className={styles.btnAdd} type="submit">
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})