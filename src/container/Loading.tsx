import React from 'react';
import '../style/Loading.less';

export const Loading = () => {
    return (
        <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'height': '100%', 'width': '100%' }}>
            <div className="loadingio-spinner-blocks-db180yfy9n">
                <div className="ldio-2r5lfwuydx7">
                    <div style={{ 'left': '38px', 'top': '38px', 'animationDelay': '0s' }} />
                    <div style={{ 'left': '80px', 'top': '38px', 'animationDelay': '0.125s' }} />
                    <div style={{ 'left': '122px', 'top': '38px', 'animationDelay': '0.25s' }} />
                    <div style={{ 'left': '38px', 'top': '80px', 'animationDelay': '0.875s' }} />
                    <div style={{ 'left': '122px', 'top': '80px', 'animationDelay': '0.375s' }} />
                    <div style={{ 'left': '38px', 'top': '122px', 'animationDelay': '0.75s' }} />
                    <div style={{ 'left': '80px', 'top': '122px', 'animationDelay': '0.625s' }} />
                    <div style={{ 'left': '122px', 'top': '122px', 'animationDelay': '0.5s' }} />
                </div>
            </div>
        </div>

    )
};

