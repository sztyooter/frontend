
export const PageRank = (graph, dampingFactor=0.85, epsilon=1e-8) => {
    // Initialize the PageRank values of each node with a uniform probability distribution.
    const keys = Object.keys(graph);
    const numNodes = keys.length;
    let pageranks = [];

    for (let n = 0; n < numNodes; n++) {
        pageranks.push(1 / numNodes);
    }

    // Iteratively update the PageRank values until convergence.
    while (true) {
        // Compute the PageRank values for the next iteration using the formula:
        //   PR(A) = (1 - damping_factor) / N + damping_factor * sum(PR(T) / C(T)) for T in in_links(A)
        const nextPageranks = Array(numNodes).fill(0);

        for (let node = 0; node < numNodes; node++) {

            const neighbors = graph[keys[node]];
            const numNeighbors = neighbors.length;
            const constPageRanks = pageranks;
            if (numNeighbors === 0) continue;
            nextPageranks[node] = (1 - dampingFactor) / numNodes;
            nextPageranks[node] += dampingFactor * neighbors.reduce((sum, neighbor) => sum + (neighbor.numberOfWins / neighbor.numberOfGames) * constPageRanks[keys.indexOf(neighbor.against.name)] / graph[neighbor.against.name].length, 0);
        }

        //console.log(nextPageranks);

        // Check for convergence by comparing the difference between the PageRank values in the current and next iterations.
        if (pageranks.reduce((sum, pr, i) => sum + Math.abs(pr - nextPageranks[i]), 0) < epsilon) break;
        pageranks = nextPageranks;
    }

    const sum = pageranks.reduce((sum, pr) => sum + pr, 0);
    let ret = [];

    for (let node = 0; node < numNodes; node++) {

        ret.push({
            name: keys[node],
            value: pageranks[node] / sum
        })
    }

    ret.sort((a, b) => {
        if (a.value >= b.value) {
            return -1;
        } else {
            return 1;
        }
    });

    return ret;
};