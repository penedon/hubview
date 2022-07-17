import React from "react";
import { Row, Col } from 'react-bootstrap';
import './BranchMenu.css'

import HubCard from 'components/blocks/hubCard/HubCard'

const BranchMenu = (props) => {
    let { branches, selected, setSelectedBranch } = props;

    const renderBranches = () => {
        let branchList = []

        branches.forEach((e) => {
            branchList.push(
                <Col sm={4} md={12}>                     
                    <HubCard 
                        className='noSelect'
                        title={e.name}
                        subTitle={e.commit.sha.slice(0,20) + '...'}
                        selected={selected && selected.name === e.name}
                        onClick={() => setSelectedBranch(e)}
                    />
                </Col>
            )
        });
        return branchList
    }

    return (
        <Row className="branchMenu">
            {renderBranches()}
        </Row>
    )
}

export default BranchMenu;