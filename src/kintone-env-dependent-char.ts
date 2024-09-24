import { KintoneRestAPIClient, KintoneRecordField } from "@kintone/rest-api-client";

// リモートリポジトリ
// https://github.com/takokke/kintone-yutaka-test-shipping-information
(() => {
    'use strict';
    /* 定数の定義*/


    // 末尾に[縺]を入れる
    /* 関数の定義 */
    const replaceNonJISCharacters = (input: string) => {

        const nonJISRegex = /[^\u0020-\u007E\u00A1-\u00DF\uFF61-\uFF9F\u3041-\u3093\u30A1-\u30F6\u30FB-\u30FC\u4E00-\u9FA0\u3000-\u303F\uFF01-\uFF5E\uFF10-\uFF5E]/g;

        // 置き換え文字を定義
        let replacementCharacter = '[縺]';

        return input.replace(nonJISRegex, replacementCharacter);
    }

    // 環境依存文字をチェックする関数
    const containsNonJISCharacters =  (input: string)=>{
        /* 定数の定義*/
        const nonJISRegex = /[^\u0020-\u007E\u00A1-\u00DF\uFF61-\uFF9F\u3041-\u3093\u30A1-\u30F6\u30FB-\u30FC\u4E00-\u9FA0\u3000-\u303F\uFF01-\uFF5E\uFF10-\uFF5E]/g;
        
        // \u0020-\u007E: 基本的なASCII文字（空白や記号を含む）
        // \u00A1-\u00DF: 半角カタカナとラテン文字の一部
        // \u3041-\u3093: ひらがな
        // \u30A1-\u30F6: カタカナ
        // \u30FB\: 
        // \u30FC\:「ー」（長音符）
        // \u4E00-\u9FA0: 漢字（CJK統合漢字）
        // \u3000-\u303F: 句読点などの日本語の記号
        // \uFF01: ！
        // \uFF02: "
        // \uFF03: #
        // …
        // \uFF5E: ～（波ダッシュ)
        // \uFF10-\uFF19: 全角の数字（０～９）
        // \uFF21-\uFF3A: 全角のアルファベット（大文字 A～Z）
        // \uFF41-\uFF5A: 全角のアルファベット（小文字 a～z）
        // \uFF5E: ～
        // \uFF61-\uFF9F: 半角カタカナ

       return nonJISRegex.test(input);
    }

    /* 型の定義 */ 
    interface KintoneEvent {
        record: kintone.types.SavedFields;
    }

    // 参考記事
    // https://github.com/kintone/js-sdk/blob/main/packages/rest-api-client/docs/typescript.md
    type ShippingData = {
        $id: KintoneRecordField.ID;
        $revision: KintoneRecordField.Revision;
        更新者: KintoneRecordField.Modifier;
        作成者: KintoneRecordField.Creator;
        レコード番号: KintoneRecordField.RecordNumber;
        更新日時: KintoneRecordField.UpdatedTime;
        作成日時: KintoneRecordField.CreatedTime;
        注文日: KintoneRecordField.Date;
        注文商品名: KintoneRecordField.SingleLineText;
        配送番号: KintoneRecordField.SingleLineText;
        配送業者_0: KintoneRecordField.Dropdown;
        請求書: KintoneRecordField.SingleLineText;
        電話番号: KintoneRecordField.SingleLineText;
        注文番号: KintoneRecordField.SingleLineText;
        注文枚数_白: KintoneRecordField.Number;
        担当者_姓: KintoneRecordField.SingleLineText;
        担当者_姓_フリガナ: KintoneRecordField.SingleLineText;
        受注明細書番号: KintoneRecordField.SingleLineText;
        希望納品日: KintoneRecordField.Date;
        送り状番号: KintoneRecordField.SingleLineText;
        住所2: KintoneRecordField.SingleLineText;
        ユタカ出し: KintoneRecordField.SingleLineText;
        住所1: KintoneRecordField.SingleLineText;
        注文枚数_ピンク: KintoneRecordField.Number;
        配送業者: KintoneRecordField.SingleLineText;
        実納品時間: KintoneRecordField.SingleLineText;
        納品書: KintoneRecordField.SingleLineText;
        注文枚数_ゴールド: KintoneRecordField.Number;
        領収書: KintoneRecordField.SingleLineText;
        実配送日: KintoneRecordField.Date;
        担当者_名_フリガナ: KintoneRecordField.SingleLineText;
        個人名_団体: KintoneRecordField.SingleLineText;
        総額: KintoneRecordField.Number;
        注文枚数_サーモン: KintoneRecordField.Number;
        郵便番号1: KintoneRecordField.SingleLineText;
        注文者: KintoneRecordField.SingleLineText;
        郵便番号2: KintoneRecordField.SingleLineText;
        工程進捗状況: KintoneRecordField.Dropdown;
        受注商品番号: KintoneRecordField.SingleLineText;
        担当者_名: KintoneRecordField.SingleLineText;
        注文枚数_グリーン: KintoneRecordField.Number;
        個人名_団体_フリガナ: KintoneRecordField.SingleLineText;
        希望納品時間: KintoneRecordField.SingleLineText;
        注文枚数_ブルー: KintoneRecordField.Number;
        日付確認: KintoneRecordField.Dropdown;
        注文枚数_サックス: KintoneRecordField.Number;
        都道府県: KintoneRecordField.SingleLineText;
        注文枚数_イエロー: KintoneRecordField.Number;
        注文枚数: KintoneRecordField.Number;

        備考: KintoneRecordField.CheckBox;
        受け取り不可能な曜日: KintoneRecordField.CheckBox;
        Tシャツ_テーブル: KintoneRecordField.Subtable<{
            Tシャツ_サイズ_XL: KintoneRecordField.SingleLineText;
            Tシャツ_サイズ_L: KintoneRecordField.SingleLineText;
            Tシャツ_サイズ_M: KintoneRecordField.SingleLineText;
            Tシャツ_生地色: KintoneRecordField.SingleLineText;
            Tシャツ_サイズ_XS: KintoneRecordField.SingleLineText;
            Tシャツ_サイズ_140: KintoneRecordField.SingleLineText;
            Tシャツ_サイズ_S: KintoneRecordField.SingleLineText;
            Tシャツ_サイズ_160: KintoneRecordField.SingleLineText;
            Tシャツ_サイズ_150: KintoneRecordField.SingleLineText;
        }>;
    }

    // レコード詳細画面において、環境依存文字を含むフィールドを黄色にする
    // まずは、全種類のフィールドを取得する必要がある。
    kintone.events.on("app.record.detail.show", (event: KintoneEvent)=> {

      
        try {
            const record = event.record;
            // フィールド名を配列で定義
            const fieldCodes: (keyof kintone.types.SavedFields)[] = [
                'ユタカ出し',
                '住所1',
                '住所2',
                '個人名_団体',
                '個人名_団体_フリガナ',
                '実納品時間',
                '希望納品時間',
                '担当者_名',
                '担当者_名_フリガナ',
                '担当者_姓',
                '担当者_姓_フリガナ',
                '注文者',
                '注文商品名',
                '納品書',
                '請求書',
                '都道府県',
                '配送業者',
                '領収書',
                '郵便番号1',
                '郵便番号2'
            ];

            fieldCodes.forEach(fieldCode => {
                const fieldValue = record[fieldCode]?.value;
            
                // console.log(`フィールド名: ${fieldCode}, 値: ${fieldValue}, 型: ${typeof fieldValue}`);
            
                if (fieldValue === null || typeof fieldValue !== 'string') {
                    console.log(`${fieldCode} は値がnullまたは文字列ではありません。`);
                    return;
                }
                
                const containsNonJIS = containsNonJISCharacters(fieldValue);
                const containsSpecialChar = fieldValue.includes("[縺]");
            
                //console.log(`フィールド名: ${fieldCode}, Non-JIS: ${containsNonJIS}, 特殊文字: ${containsSpecialChar}`);
            
                if (containsNonJIS || containsSpecialChar) {
                    let fieldElement = kintone.app.record.getFieldElement(fieldCode);
                    if (fieldElement === null) {
                        throw new Error(`フィールド "${fieldCode}" が見つかりません`);
                    }
                    fieldElement.style.backgroundColor = 'yellow';
                }
            });

        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                alert(err.message);
            } else {
                console.error(err);
                alert("An unknown error occurred");
            }
        }

        


        return event;
    })
    // レコード一覧画面
    // 置き換えボタンを表示
    kintone.events.on("app.record.index.show", (event) => {

        if (document.getElementById('replace_button') !== null) {
          return false;
        }
        const button = document.createElement("button");
        button.id = "replace_button";
        button.innerHTML = '<span></span>環境依存文字を置換する';
        
        button.onclick = async () => {
            // 全レコードを取得

            try {

                document.getElementById("#replace_button")?.classList.add("click");

                button.disabled = true;
                
                const client = new KintoneRestAPIClient({});
                const APP_ID = kintone.app.getId();

                if (APP_ID === null) {
                    throw new Error("アプリIDが取得できませんでした。");
                }

                const getAllRecordsParams = {
                    app: APP_ID,
                };
                
                const getAllRecordsResp = await client.record.getAllRecords<ShippingData>(getAllRecordsParams);
                const nonJISRegex = /[^\u0020-\u007E\u00A1-\u00DF\uFF61-\uFF9F\u3041-\u3093\u30A1-\u30F6\u30FB-\u30FC\u4E00-\u9FA0\u3000-\u303F\uFF01-\uFF5E\uFF10-\uFF5E]/g;
                
                const targetRecords = await getAllRecordsResp.filter((record) => {
                    return nonJISRegex.test(record.ユタカ出し.value) ||
                        nonJISRegex.test(record.住所1.value) || 
                        nonJISRegex.test(record.住所2.value) || 
                        nonJISRegex.test(record.個人名_団体.value) ||
                        nonJISRegex.test(record.個人名_団体_フリガナ.value) ||
                        nonJISRegex.test(record.実納品時間.value) ||
                        nonJISRegex.test(record.希望納品時間.value) ||
                        nonJISRegex.test(record.担当者_名.value) ||
                        nonJISRegex.test(record.担当者_名_フリガナ.value) ||
                        nonJISRegex.test(record.担当者_姓.value) ||
                        nonJISRegex.test(record.担当者_姓_フリガナ.value) ||
                        nonJISRegex.test(record.注文商品名.value) ||
                        nonJISRegex.test(record.注文者.value) ||
                        nonJISRegex.test(record.納品書.value) ||
                        nonJISRegex.test(record.請求書.value) ||
                        nonJISRegex.test(record.郵便番号1.value) ||
                        nonJISRegex.test(record.郵便番号2.value) ||
                        nonJISRegex.test(record.都道府県.value) ||
                        nonJISRegex.test(record.配送業者.value) ||
                        nonJISRegex.test(record.領収書.value);
                });

                console.log(targetRecords);
                
                let updateRecords: any[] = [];
                
                // 更新する内容を作成
                targetRecords.forEach((record) => {
                    let updateRecord = {
                        id: record.$id.value,
                        record: {
                            ユタカ出し: {
                                value: replaceNonJISCharacters(record.ユタカ出し.value)
                            },
                            住所1: {
                                value: replaceNonJISCharacters(record.住所1.value)
                            },
                            住所2: {
                                value: replaceNonJISCharacters(record.住所2.value)
                            },
                            個人名_団体: {
                                value: replaceNonJISCharacters(record.個人名_団体.value)
                            },
                            個人名_団体_フリガナ: {
                                value: replaceNonJISCharacters(record.個人名_団体_フリガナ.value)
                            },
                            実納品時間: {
                                value: replaceNonJISCharacters(record.実納品時間.value)
                            },
                            希望納品時間: {
                                value: replaceNonJISCharacters(record.希望納品時間.value)
                            },
                            担当者_名: {
                                value: replaceNonJISCharacters(record.担当者_名.value)
                            },
                            担当者_名_フリガナ: {
                                value: replaceNonJISCharacters(record.担当者_名_フリガナ.value)
                            },
                            担当者_姓: {
                                value: replaceNonJISCharacters(record.担当者_姓.value)
                            },
                            担当者_姓_フリガナ: {
                                value: replaceNonJISCharacters(record.担当者_姓_フリガナ.value)
                            },
                            注文商品名: {
                                value: replaceNonJISCharacters(record.注文商品名.value)
                            },
                            注文者: {
                                value: replaceNonJISCharacters(record.注文者.value)
                            },
                            納品書: {
                                value: replaceNonJISCharacters(record.納品書.value)
                            },
                            請求書: {
                                value: replaceNonJISCharacters(record.請求書.value)
                            },
                            郵便番号1: {
                                value: replaceNonJISCharacters(record.郵便番号1.value)
                            },
                            郵便番号2: {
                                value: replaceNonJISCharacters(record.郵便番号2.value)
                            },
                            都道府県: {
                                value: replaceNonJISCharacters(record.都道府県.value)
                            },
                            配送業者: {
                                value: replaceNonJISCharacters(record.配送業者.value)
                            },
                            領収書: {
                                value: replaceNonJISCharacters(record.領収書.value)
                            }
                        }
                    };
                    updateRecords.push(updateRecord);
                });

                console.log(updateRecords);

                const updateAllRecordsParams = {
                    app: APP_ID,
                    records: updateRecords,
                };
                
                await client.record.updateAllRecords(updateAllRecordsParams);
                
                // ボタン要素を取得
                const replaceButton = document.getElementById("replace_button");

                // クラスを削除
                if (replaceButton) {
                    replaceButton.classList.remove("click");
                    // HTMLを更新
                    replaceButton.innerHTML = "<span></span>環境依存文字を置換する";
                }
                button.disabled = false;
                
                alert("JIS非対応文字の置換が完了しました");

                location.reload();

            } catch (err) {
                if (err instanceof Error) {
                    console.error(err);
                    alert(err.message);
                } else {
                    console.error(err);
                    alert("An unknown error occurred");
                }
            }
        };
        
        const headerMenuSpace = kintone.app.getHeaderMenuSpaceElement();
        headerMenuSpace?.appendChild(button);
        
        return event;
    });

})();