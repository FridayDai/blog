const Loading = () => {
    const spinner = () => {
        const wrappedDiv = document.createElement('div');
        const div = document.createElement('div');
        const divMask = document.createElement('div');
        divMask.className = 'modal-mask';
        const divWrap = document.createElement('div');
        divWrap.className = 'modal-wrap';
        const divContent = document.createElement('div');
        divContent.className = 'modal-content';
        const divSpinner = document.createElement('div');
        divSpinner.className = 'lds-facebook';
        const divItem1 = document.createElement('div');
        const divItem2 = document.createElement('div');
        const divItem3 = document.createElement('div');

        wrappedDiv.append(div);
        div.append(divMask);
        div.append(divWrap);
        divWrap.append(divContent);
        divContent.append(divSpinner);
        divSpinner.append(divItem1);
        divSpinner.append(divItem2);
        divSpinner.append(divItem3);

        return wrappedDiv;

        {/*<div>*/}
            {/*<div>*/}
                {/*<div className='modal-mask'></div>*/}
                {/*<div className='modal-warp'>*/}
                    {/*<div className='modal-content'>*/}
                        {/*<div className='lds-facebook'>*/}
                            {/*<div></div>*/}
                            {/*<div></div>*/}
                            {/*<div></div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
            {/*</div>*/}
        {/*</div>*/}
    };

    document.body.append(spinner());
};

export default Loading;
