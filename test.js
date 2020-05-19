const nodeList = [
    { id: 2, parentId: 1 },
    { id: 1, parentId: 0 },
    { id: 3, parentId: 0 }
];

const res = [
    {
        id: 1,
        parentId: 0,
        children: [
            {
                id: 2,
                parentId: 1
            }
        ]
    },
    {
        id: 3,
        parentId: 0
    }
];

const result = [];

const filterdList = nodeList.filter(item => item.parentId === 0);

function convert(nodeList) {

}
