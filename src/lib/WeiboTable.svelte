<script>
    import {PowerTable} from '@muonw/powertable';

    export let weibo_data
    // map
    // TODO: 正则表达式搜索选项(default?)
    // deta: 可以考虑将用户名的filter改为单多选
    // https://github.com/muonw/powertable/blob/main/src/routes/examples/example8/+page.svelte#L62
    $: ptData = weibo_data.map(item => {
        return {
            id: `<a target="_blank" href="https://weibo.cn/comment/${item.id}">${item.id}</a>`,
            // content: item.content.length > 140
            //     ? `${item.content.substring(0, 140)}……`
            //     : item.content,
            username: item.username,
            content: item.content,
            publish_time: item.publish_time,
            up_num: item.up_num,
            retweet_num: item.retweet_num,
            comment_num: item.comment_num,
        }
    })

    let ptInstructs = [
        {key: 'id', title: '链接', parseAs: 'unsafe-html', filterable: false, sortable: false},
        {key: 'username', title: '用户名', parseAs: 'unsafe-html', sortable: false},
        {key: 'content', title: '内容', sortable: false},
        {key: 'publish_time', title: '发布时间', userFunctions: {customSort: sortDates}},
        {key: 'up_num', title: '赞', filterable: false, userFunctions: {customSort: sortNumbers}},
        {key: 'retweet_num', title: '转', filterable: false, userFunctions: {customSort: sortNumbers}},
        {key: 'comment_num', title: '评', filterable: false, userFunctions: {customSort: sortNumbers}},
        // {key: '', title: ''},
    ];

    let ptOptions = {
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 100],
        footerText: true,
        footerFilters: true,
    }

    function sortNumbers(v1, v2) {
        return parseFloat(v1) < parseFloat(v2) ? -1 : parseFloat(v1) > parseFloat(v2) ? 1 : 0;
    }

    function sortDates(v1, v2) {
        return new Date(v1) < new Date(v2) ? -1 : new Date(v1) > new Date(v2) ? 1 : 0;
    }

</script>

<div class="MuonW PowerTable">
    <PowerTable {ptInstructs} {ptOptions} {ptData}/>
</div>
