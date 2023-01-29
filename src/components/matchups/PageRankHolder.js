import { Decimator } from "../../algorithms/Decimator";

const PageRankHolder = (props) => {

    const getClassName = () => {

        let className = 'd-flex justify-content-between gap-3 border rounded-3 p-2 ';

        if (props.type === 'good') {
            
            return className.concat('bg-success text-white border-success');
        }

        if (props.type === 'main') {

            return className.concat('bg-warning text-dark border-warning');
        }

        if (props.type === 'bad') {

            return className.concat('bg-danger text-white border-danger');
        }

        return className.concat('bg-dark text-white border-dark');
    };

    return (
        <div className={getClassName()}>
            <p>{props.index + 1}. {props.pageRank.name}</p>
            <p>Score: {props.pageRank.value === undefined ? "Calculating" : Decimator(props.pageRank.value, 5)}</p>
        </div>
    );
}

export default PageRankHolder;