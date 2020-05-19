import React from 'react';

const HOC = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <div style={{ 'width': '100%' }}>
                    <div style={{ 'width': '100%', 'height': 0, 'paddingBottom': '50%', 'position': 'relative' }}>
                        <div style={{ 'width': '100%', 'height': '100%', 'position': 'absolute' }}>
                            <WrappedComponent {...this.props} />
                        </div>
                    </div>
                </div>
            );
        }
    }
};

const TestComponent = () => {
    return (
        <div>hahah</div>
    );
};

export default HOC(TestComponent);
