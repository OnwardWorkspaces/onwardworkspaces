import React from 'react';
import { Watch } from 'react-loader-spinner';
import * as Utils from '../Utils';

const Loader = (props) => {
    if (props.visible)
        // if(true)
        return (
            <div style={{ width: '100%', height: '100%', top: 0, left: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(153 140 140 / 48%)', zIndex: 1051, display: 'flex', position: 'fixed' }}>
                <Watch
                    height={100}
                    width={150}
                    radius={48}
                    color={Utils.themeColor}
                    secondaryColor='#4fa94d'
                    ariaLabel="ball-triangle-loading"
                    wrapperClass={{}}
                    wrapperStyle={{}}
                    visible={true}
                />
                {/* <img src={loading} style={{height:100, width:100, backgroundColor:'transparent'}} /> */}
            </div>
        )
    else
        return null;
}

export default Loader;