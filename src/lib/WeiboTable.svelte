<script>
    import {PowerTable} from '@muonw/powertable';

    export let weibo_data
    // map
    // TODO: 正则表达式搜索选项(default?)
    // deta: 可以考虑将用户名的filter改为单多选
    // deta: 去除这个框架
    // https://github.com/muonw/powertable/blob/main/src/routes/examples/example8/+page.svelte#L62
    $: ptData = weibo_data.map(item => {
        return {
            id: `<a target="_blank" href="https://weibo.cn/comment/${item.id}">${item.id}</a>`,
            username: item.username,
            content: `<div class="fold line-clamp-2"">${item.content}</div>`,
            publish_time: item.publish_time,
            up_num: item.up_num,
            retweet_num: item.retweet_num,
            comment_num: item.comment_num,
        }
    })

    let ptInstructs = [
        {key: 'id', title: '链接', parseAs: 'unsafe-html', filterable: false, sortable: false},
        {key: 'username', title: '用户名', parseAs: 'unsafe-html', sortable: false},
        {key: 'content', title: '内容', parseAs: 'unsafe-html', sortable: false},
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

    const rowOnClick = (e) => {
        const target = e.detail.event.target;
        if (target.getAttribute("class") === 'fold') {
            target.setAttribute("class", "fold line-clamp-2");
        } else {
            target.setAttribute("class", "fold");
        }
        console.log(target);
    }

</script>

<div class="MuonW PowerTable">
    <PowerTable
            on:rowClicked="{(e) => rowOnClick(e)}"
            {ptInstructs} {ptOptions} {ptData}/>
</div>
