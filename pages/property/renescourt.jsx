const RenesCourt = () => {
    return (
        <p>Redirecting...</p>
    )
}

export async function getServerSideProps(req, res) {
    return {
        redirect: {
            destination: 'https://www.lepineapartments.com/comingsoon/renescourt',
            permanent: false,
        },
    }
}

export default RenesCourt;