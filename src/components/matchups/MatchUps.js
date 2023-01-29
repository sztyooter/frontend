import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageRank } from "../../algorithms/PageRank.js";
import { getMatchUps } from "../../api/Apis.js";
import Graph from "./Graph.js";
import PageRankHolder from "./PageRankHolder";

const MatchUps = () => {

    const [searchParams] = useSearchParams();
    const [name] = useState(searchParams.get('name'));
    const [against] = useState(searchParams.get('against'));
    const [pageRanks, setPageRanks] = useState([]);
    const [indexOfAgainst, setIndexOfAgainst] = useState(0);
    const [data, setData] = useState({nodes: [], edges: []});

    useEffect(() => {
        if (name !== undefined && against !== undefined) {
            getMatchUps(name, against).then((response) => {
                console.log(response.data);
                const pr = PageRank(response['data']);
                setPageRanks(pr);
                console.log(pr);

                const indexes = {};

                let ind = 0;
                for (ind; ind < pr.length; ind++) {
                    indexes[pr[ind].name] = ind;
                }
                setIndexOfAgainst(indexes[against]);

                const nodes = [];
                const edges = [];

                pr.forEach((element, index) => {
                    nodes.push({ id: index, value: element.value, label: element.name });

                    response.data[element.name].forEach((matchUp) => {
                        edges.push({ from: indexes[matchUp.against.name], to: index, value: Math.round(matchUp.numberOfWins / matchUp.numberOfGames * 100) });
                    });
                });

                setData({
                    nodes: nodes,
                    edges: edges
                });
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const redirect = () => {
        window.location.replace("/"); 
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center m-3 container">
            <Graph data={data}/>
            <div className="d-flex flex-column justify-content-center align-items-center p-3 w-100 mw-100">
                <div className="d-flex flex-column gap-3 p-3">
                    {pageRanks !== undefined && pageRanks.length > 1
                    ?
                        pageRanks.map((pageRank, index) => {
                            let type;

                            if (index < indexOfAgainst) type = 'good';
                            if (index === indexOfAgainst) type = 'main';
                            if (index > indexOfAgainst) type = 'bad';

                            return <PageRankHolder key={index} index={index} pageRank={pageRank} type={type}/>
                        }) 
                    : 
                        <div>{"We have not enough data to about this champion :("}</div>
                    }
                </div>
                <button className="btn btn-primary" onClick={redirect}>Back to Home Page</button>
            </div>
        </div>
    );
}

export default MatchUps;