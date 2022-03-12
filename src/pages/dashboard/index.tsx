import { canSSRAuth } from "../../utils/canSSRAuth"

export default function Dashboard() {
    return (
        <div className="">
            <h1>Welcome to Dashboard</h1>
        </div>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})