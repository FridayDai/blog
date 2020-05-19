import React from 'react';

export default class Test extends React.Component() => {
    const [data, setData] = useState([
        {
            key: "wuhan",
            value: "武汉"
        },
        {
            key: "beijing",
            value: "北京"
        }
    ]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setData([
                {
                    key: "beijing",
                    value: "北京"
                }
            ]);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const refs = Object.values(data).reduce(
        (accu, { key }) => ({
            ...accu,
            // eslint-disable-next-line react-hooks/rules-of-hooks
            [key]: useRef(null)
        }),
        {}
    );
    console.log('refs', refs);

    return (
        <div>
            {
                data.map(({ value, key }, index) => (
                    <div key={key} ref={refs[key]}>{value}</div>
                ))
            }
            <div>start editing</div>
        </div>
    );
}
