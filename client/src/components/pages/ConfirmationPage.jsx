import { useParams } from 'react-router-dom';

const ConfirmationPage = () => {
    const { response } = useParams();

    return (
        <div>
            <h1>Volunteer Confirmation</h1>
            <p>{response === 'yes' ? 'Thank you for volunteering!' : 'Thank you for your response.'}</p>
        </div>
    );
};

export default ConfirmationPage;