import * as React from 'react';
import { testlogin } from '../action/loginDao';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
    }

    async testlogin() {
        const res = await testlogin();
        alert(res);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.testlogin()}>test</button>
            </div>
        );
    }
}
