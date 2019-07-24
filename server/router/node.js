const axios = require('axios');


function parseRes(res) {
    console.log(res);
}

function step1() {
    const options = {
        method: "GET",
        'headers': {
            'Referer': 'https://sso.bytedance.com/user/login?next=/oauth2/authorize%3Fstate%3Dhttps%25253A%252F%252Fsas.bytedance.net%252Fauthorize%252F%25253Fredirect_uri%25253Dhttps%2525253A%2525252F%2525252Fmersea.bytedance.net%2525252Fauth%2525252Fcallback%2525252F%2525253Fnext%2525253Dhttps%252525253A%2525252F%2525252Fmersea.bytedance.net%252526client_id%25253D1%26response_type%3Dcode%26client_id%3Dcd0748d6f9653b7622c5',
            'X-CSRFToken': 'twsb379kRKghqaHyiVYuEFBbQv4Gw5gS',
            'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'
        },
        // data,
        // url: 'https://sas.bytedance.net/authorize/?redirect_uri=https://mersea.bytedance.net/auth/callback/?next=https://mersea.bytedance.net&client_id=1'
        url: "https://sso.bytedance.com/oauth2/authorize?state=https%253A%2F%2Fsas.bytedance.net%2Fauthorize%2F%253Fredirect_uri%253Dhttps%25253A%25252F%25252Fmersea.bytedance.net%25252Fauth%25252Fcallback%25252F%25253Fnext%25253Dhttps%2525253A%25252F%25252Fmersea.bytedance.net%2526client_id%253D1&response_type=code&client_id=cd0748d6f9653b7622c5"
    };

    axios.request(options).then(res => {
        console.log(res.status);
        // step2();
    }).catch(xhr => console.error(xhr));
}
function step2() {
    const options = {
        method: "GET",
        'headers': {
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'
        },
        // data,
        url: 'https://sso.bytedance.com/oauth2/authorize/confirm'
    };

    axios.request(options).then(res => {
        console.log(res.data);
    }).catch(xhr => console.error(xhr));
}

step1();
