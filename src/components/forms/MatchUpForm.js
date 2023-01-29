import { useEffect, useState } from "react";
import { getChampions } from "../../api/Apis";

const MatchUpForm = () => {

    const [name, setName] = useState('');
    const [against, setAgainst] = useState('');
    const [champions, setChampions] = useState([]);

    useEffect(() => {
        getChampions().then((response) => {
            setChampions(response['data'].sort((a, b) => {
                if (a.name <= b.name) {
                    return -1;
                } else {
                    return 1;
                }
            }).filter((champion) => {
                return champion.name !== '';
            }));
        });
    }, []);

    const nameChanged = (event) => {
        setName(event.target.value);
    };

    const againstChanged = (event) => {
        setAgainst(event.target.value);
    };

    const redirect = () => {
        window.location.replace(`/matchups?name=${name}&against=${against}`); 
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-50">
            <div className="mb-3 w-100 d-none">
                <label htmlFor="summonerNameInput" className="form-label">Summoner Name</label>
                <input type="text" className="form-control" id="summonerNameInput" name="name" aria-describedby="summonerNameHelp" onChange={nameChanged}/>
                <div id="summonerNameHelp" className="form-text">Only EUNE accounts are supported.</div>
            </div>
            <div className="mb-3 w-100">
                <label htmlFor="championInput" className="form-label">Champion Name</label>
                <select className="form-control" id="championInput" aria-describedby="championInputHelp" onChange={againstChanged}>
                    {champions.map((champion, index) => {
                        if (index === 0 && against === '') {
                            setAgainst(champion.name);
                        }

                        return <option key={index}>{champion.name}</option>
                    })}
                </select>
                <div id="championInputHelp" className="form-text">Champion you are playing against.</div>
            </div>

            <button className="btn btn-primary" onClick={redirect}>Submit</button>
        </div>
    );
}

export default MatchUpForm;