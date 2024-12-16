import React from 'react';
import PropTypes from 'prop-types';

const Color = (props) => {
    const { colorData, setColor } = props;
    console.log('colorData', colorData);
    return (
        <ul className='colors ps-0'>
            {
                colorData.map((item, index) => {
                    return (
                        <li onClick={() => setColor(item?._id)} key={index} style={{ backgroundColor: item?.code }}></li>
                    )
                })
            }
        </ul>
    )
}
Color.propTypes = {
    colorData: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired
    })).isRequired,
    setColor: PropTypes.func.isRequired
};

export default Color;