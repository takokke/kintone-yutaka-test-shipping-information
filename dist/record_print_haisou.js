jQuery.noConflict();
(($) => {
  'use strict';

  kintone.events.on(['app.record.index.show'], (e) => {
    const appId = kintone.app.getId();
    const viewName = e.viewName;
    const query = kintone.app.getQueryCondition();
    const query2 = kintone.app.getQuery();
    const sort = query2.split(/by|limit/);

    // 列名取得
    kintone.api(kintone.api.url('/k/v1/app/views', true), 'GET', {app: appId}, (resp) => {
      const fields = resp.views[viewName].fields;
      // 全件取得関数
      // カーソルAPIを使った方法に書き換える必要あり
      const fetch = (opt_offset, opt_records) => {
        const offset = opt_offset || 0;
        let records = opt_records || [];
        const params = {
          app: appId,
          query: query + ' order by' + sort[1] + ' limit 500 offset ' + offset,
          fields: fields
        };
        return kintone.api('/k/v1/records', 'GET', params).then((x) => {
          records = records.concat(x.records);
          if (x.records.length === 500) {
            return fetch(offset + 500, records);
          }
          return records;
        });
      };

      // 関数実行、{列名：値}になるよう組み替える
      fetch().then((y) => {
        let records = y;
        let data = [];
        for (let i = 0; i < records.length; i++) {
          let record = {};
          for (let key in records[i]) {
            if (records[i][key].value === null) {
              records[i][key].value = '';// nullを文字として表示しないようにする
            }
            record[key] = records[i][key].value;
          }
          data.push(record);
        }

        let print_button = document.createElement('button');
        print_button.id = 'pb';
        print_button.innerHTML = '印刷';
        print_button.className = 'kintoneplugin-button-dialog-ok';
        print_button.onclick = () => {
          printJS({
            printable: data,
            properties: fields,
            type: 'json'
          });
        };
        if (document.getElementById('pb') !== null) {
          let element = document.getElementById('pb');
          element.parentNode.removeChild(element);
        }
        kintone.app.getHeaderMenuSpaceElement().appendChild(print_button);
      });
    });
    return event;
  });

})();
