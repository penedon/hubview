import React from 'react';
import './HubCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HubCard = (props) => {
    let { title, subTitle, bottomItems, image, noHover, selected, onClick } = props;

    const renderImage = () => {
        if (image) {
            return (
                <div className='image'>
                    <img src={image} alt="" />
                </div>
            )
        }
    }

    const renderTitle = () => {
        if (title)
            return <h6>{title}</h6>
    }

    const renderSubTitle = () => {
        if (subTitle)
            return <p>{subTitle}</p>
    }

    const renderBottomItems = () => {
        if (bottomItems && bottomItems.length > 0) {
            let items = []
            bottomItems.forEach((e) => {
                if (e.text != null && e.text !== 0) {
                    items.push(
                        <div>
                            <FontAwesomeIcon icon={e.icon} />
                            <span>{e.text}</span>
                        </div>
                    )
                }
                
            })
            return (
                <div className="hubCardFooter">
                    {items}
                </div>
            )
        }
    }

    let className = 'hubCard'
    if (noHover)
        className = className + ' noHover'
    if (selected)
        className = className + ' selected'
        
    return (
        <div className={className}
             onClick={onClick}>
            {renderImage()}
            {renderTitle()}
            {renderSubTitle()}
            {renderBottomItems()}
        </div>
    )

}

export default HubCard;