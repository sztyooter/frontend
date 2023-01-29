import { useEffect, useRef } from "react";
import { Network } from "vis";

const Graph = (prop) => {

    const divRef = useRef(null);

    useEffect(() => {

        const container = divRef;
        const options = {
            nodes: {
                shape: "dot",
                scaling: {
                  customScalingFunction: function (min, max, total, value) {
                    return value / total;
                  },
                  min: 5,
                  max: 150,
                },
            },
            physics: {
                solver: "repulsion",
            }
        };

        console.log(prop.data)
        new Network(container.current, prop.data, options);
    }, [divRef, prop.data]); 

    return <div className="bg-light border rounded graph" ref={divRef}/>;
};

export default Graph;