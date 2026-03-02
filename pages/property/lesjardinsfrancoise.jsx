const LesJardinsFrancoise = () => {
    return (
        <p>Redirecting...</p>
    )
}

export async function getServerSideProps(req, res) {
    return {
        redirect: {
            destination: 'https://www.lepineapartments.com/comingsoon/lesjardinsfrancoise',
            permanent: false,
        },
    }
}

export default LesJardinsFrancoise;