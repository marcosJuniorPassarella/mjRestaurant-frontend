import Head from 'next/head';
import { Header } from '../../components/Header/index';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss'
import { FiUpload } from 'react-icons/fi'
import { ChangeEvent, useState } from 'react';

export default function Product() {
    const [imgUrl, setImgUrl] = useState('');
    const [image, setImage] = useState(null);

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }
        const image = e.target.files[0];
        if (!image) {
            return;
        }
        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImage(image);
            setImgUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <>
            <Head>
                <title>MjRestaurant - Novo Produto</title>
            </Head>
            <div className="">
                <Header />

                <main className={styles.container}>
                    <h1>Novo Produto</h1>
                    <form className={styles.form}>

                        <label className={styles.labelImg}>
                            <span>
                                <FiUpload size={30} color="#fff" />
                            </span>
                            <input type="file" accept='image/png, image/jpeg'
                                onChange={handleFile} />

                            {imgUrl && (
                                <img
                                    className={styles.preview}
                                    src={imgUrl}
                                    alt="Foto do produto"
                                    width={250}
                                    height={250}
                                />
                            )}

                        </label>

                        <select>
                            <option>Bebida</option>
                            <option>Pizzas</option>
                        </select>

                        <input
                            type="text"
                            placeholder='Digite o nome do produto'
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder='Valor do produto'
                            className={styles.input}
                        />

                        <textarea
                            placeholder='Descrição do produto'
                            className={styles.input}
                        />

                        <button
                            type='submit'
                            className={styles.btnAdd}
                        >
                            Cadastrar
                        </button>

                    </form>

                </main>

            </div>
        </>
    )
}

export const getServerSidePros = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})