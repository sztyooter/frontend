import MatchUpForm from "../forms/MatchUpForm";


const Landing = () => {

    return (
        <div className="p-3 bg-light text-dark border border-light rounded-3 d-flex flex-column justify-content-center align-items-center">
            <h1 className="fs-1 mb-3">Welcome to Champion Rank!</h1>
            <h2 className="fs-5 mb-5">We will pick the best matchups for you.</h2>
            <MatchUpForm></MatchUpForm>
        </div>
    );
}

export default Landing;