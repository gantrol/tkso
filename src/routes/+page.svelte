<script>
    import { onMount } from 'svelte';
    import initSqlJs from 'sql.js';
    import WeiboTable from "$lib/WeiboTable.svelte";
    // 赋个默认值 TODO: 正在加载
    let sqlFileInput;
    let db;
    let SQL;
    let sqlStr = `SELECT 微博id, user_name AS '用户名', 微博正文, 发布时间, 转发数, 评论数 FROM simple_weibo
                LEFT JOIN user ON simple_weibo.user_id = user.user_id`;

    let weibo_data = [];
    onMount(async () => {
        SQL = await initSqlJs({
            locateFile: file => `wasm/${file}`
        });
        console.log('read db');
        const res = await fetch('data/tk.sqlite');
        const buf = await res.arrayBuffer();
        db = loadDbBuf(buf);
        weibo_data = execute(sqlStr)
    });

    const upload = () => {
        // TODO: 异常处理
        const file = sqlFileInput.files[0];
        const r = new FileReader();
        r.onload = function() {
            db = loadDbBuf(r.result);
            weibo_data = execute(sqlStr);
        }
        r.readAsArrayBuffer(file);
    }

    const loadDbBuf = (buf) => {
        const Uints = new Uint8Array(buf);
        return new SQL.Database(Uints);
    }

    const execute = (sqlStr) => {
        const stmt = db.exec(sqlStr);
        return stmt[0].values.map(item => {
            return {
                id: item[0],
                username: item[1],
                content: item[2],
                publish_time: item[3],
                up_num: item[4],
                retweet_num: item[5],
                comment_num: item[6],
            }
        })
    }
</script>

<svelte:head>
    <title>TK 搜</title>
    <meta name="description" content="tk so v0.0.1"/>
</svelte:head>

<section>
    <label for="sqlFileInput" >可自选数据库</label>
    <input id="sqlFileInput" type="file" bind:this={sqlFileInput} on:change={upload}/>
    <WeiboTable bind:weibo_data={weibo_data}/>
</section>

