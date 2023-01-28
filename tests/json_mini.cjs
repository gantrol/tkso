const fs = require('fs');

const main = (id) => {
    const json_str = fs.readFileSync(`/Users/gantrol/Documents/svelte/tkso/static/data/${id}.json`, {encoding:'utf8', flag:'r'})
    const json_json = JSON.parse(json_str)
    const mini_json = JSON.stringify(json_json)

    fs.writeFileSync(`/Users/gantrol/Documents/svelte/tkso/static/data/${id}.mini.json`, mini_json)
}

let id_list = [
    '7795562278',
    '7796910605',
]
for (let i of id_list) {
    main(i)
}