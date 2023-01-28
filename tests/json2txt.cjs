const fs = require('fs');

let id_list = [
    '1401527553',
    '6827625527',
    '7795562278',
    '7796910605',
]

const main = (id) => {
    const json_str = fs.readFileSync(`/Users/gantrol/Documents/svelte/tkso/static/data/${id}.mini.json`, {encoding:'utf8', flag:'r'})
    const json_json = JSON.parse(json_str)
    let weibos = json_json.weibo;
    return weibos.map(weibo_json => weibo_json.content);
}

let result = []
for (let i of id_list) {
    let tmp = main(i);
    result = result.concat(tmp);
}

fs.writeFileSync(`/Users/gantrol/Documents/svelte/tkso/static/data/content.txt`, result.join('\n\n'))
