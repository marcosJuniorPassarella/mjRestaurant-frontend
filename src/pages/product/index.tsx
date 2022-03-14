import Head from 'next/head';
import { Header } from '../../components/Header/index';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss'
import { FiUpload } from 'react-icons/fi'
import { ChangeEvent, useState, FormEvent } from 'react';
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps {
    categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [imgUrl, setImgUrl] = useState('');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

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

    function handleChangeCategory(e) {
        setCategorySelected(e.target.value)
    }

    async function handleRegister(e: FormEvent) {
        e.preventDefault();
        try {
            const data = new FormData();

            if (name === '' || price === '' || description === '' || image === null) {
                toast.error('Campos em branco ou inválidos');
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', image);

            const apiClient = setupAPIClient();

            await apiClient.post('/product', data)

            toast.success('Produto cadastrado com sucesso!')

        } catch (error) {
            console.log(error);
            toast.error('Erro ao criar produto')
        }

        setName('')
        setPrice('')
        setDescription('')
        setImage(null)
        setImgUrl('')
    }

    return (
        <>
            <Head>
                <title>MjRestaurant - Novo Produto</title>
            </Head>
            <div className="">
                <Header />
                <main className={styles.container} onSubmit={handleRegister}>
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

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>
                        <input
                            type="text"
                            placeholder='Digite o nome do produto'
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Valor do produto'
                            className={styles.input}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <textarea
                            placeholder='Descrição do produto'
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/category')
    return {
        props: {
            categoryList: response.data
        }
    }
})