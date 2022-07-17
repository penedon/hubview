import React from "react";
import { Row, Col } from 'react-bootstrap';

import HubCard from 'components/blocks/hubCard/HubCard';
import { timeSince } from "helpers/format";


const CommitList = (props) => {
    let { commits } = props;

    const renderCommits = () => {
        let commitList = [];
        commits.forEach((e) => {
            const bottomItems = [
                {icon:"fa-solid fa-user", text: e.commit.author.email},
                {icon:"fa-regular fa-clock", text: timeSince(e.commit.author.date)},
            ] 
            commitList.push(
                <Col sm={12}>
                    <HubCard 
                        title={e.commit.message}
                        subTitle={e.sha}
                        bottomItems={bottomItems}
                        noHover={true}
                    />
                </Col>
            )
        });
        return commitList;
    }

    return (
        <Row>
            {renderCommits()}
        </Row>
    )
}

export default CommitList;