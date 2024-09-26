declare namespace kintone.types {
  interface Fields {
    注文日: kintone.fieldTypes.Date;
    注文商品名: kintone.fieldTypes.SingleLineText;
    配送番号: kintone.fieldTypes.SingleLineText;
    配送業者_0: kintone.fieldTypes.DropDown;
    請求書: kintone.fieldTypes.SingleLineText;
    電話番号: kintone.fieldTypes.SingleLineText;
    注文番号: kintone.fieldTypes.SingleLineText;
    注文枚数_白: kintone.fieldTypes.Number;
    担当者_姓: kintone.fieldTypes.SingleLineText;
    担当者_姓_フリガナ: kintone.fieldTypes.SingleLineText;
    受注明細書番号: kintone.fieldTypes.SingleLineText;
    希望納品日: kintone.fieldTypes.Date;
    送り状番号: kintone.fieldTypes.SingleLineText;
    住所2: kintone.fieldTypes.SingleLineText;
    ユタカ出し: kintone.fieldTypes.SingleLineText;
    住所1: kintone.fieldTypes.SingleLineText;
    注文枚数_ピンク: kintone.fieldTypes.Number;
    配送業者: kintone.fieldTypes.SingleLineText;
    実納品時間: kintone.fieldTypes.SingleLineText;
    納品書: kintone.fieldTypes.SingleLineText;
    注文枚数_ゴールド: kintone.fieldTypes.Number;
    領収書: kintone.fieldTypes.SingleLineText;
    実配送日: kintone.fieldTypes.Date;
    担当者_名_フリガナ: kintone.fieldTypes.SingleLineText;
    個人名_団体: kintone.fieldTypes.SingleLineText;
    総額: kintone.fieldTypes.Number;
    注文枚数_サーモン: kintone.fieldTypes.Number;
    郵便番号1: kintone.fieldTypes.SingleLineText;
    注文者: kintone.fieldTypes.SingleLineText;
    郵便番号2: kintone.fieldTypes.SingleLineText;
    工程進捗状況: kintone.fieldTypes.DropDown;
    受注商品番号: kintone.fieldTypes.SingleLineText;
    担当者_名: kintone.fieldTypes.SingleLineText;
    注文枚数_グリーン: kintone.fieldTypes.Number;
    個人名_団体_フリガナ: kintone.fieldTypes.SingleLineText;
    希望納品時間: kintone.fieldTypes.SingleLineText;
    注文枚数_ブルー: kintone.fieldTypes.Number;
    日付確認: kintone.fieldTypes.DropDown;
    注文枚数_サックス: kintone.fieldTypes.Number;
    都道府県: kintone.fieldTypes.SingleLineText;
    注文枚数_イエロー: kintone.fieldTypes.Number;
    注文枚数: kintone.fieldTypes.Number;

    備考: kintone.fieldTypes.CheckBox;
    受け取り不可能な曜日: kintone.fieldTypes.CheckBox;
    Tシャツ_テーブル: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          Tシャツ_サイズ_XL: kintone.fieldTypes.SingleLineText;
          Tシャツ_サイズ_L: kintone.fieldTypes.SingleLineText;
          Tシャツ_サイズ_M: kintone.fieldTypes.SingleLineText;
          Tシャツ_生地色: kintone.fieldTypes.SingleLineText;
          Tシャツ_サイズ_XS: kintone.fieldTypes.SingleLineText;
          Tシャツ_サイズ_140: kintone.fieldTypes.SingleLineText;
          Tシャツ_サイズ_S: kintone.fieldTypes.SingleLineText;
          Tシャツ_サイズ_160: kintone.fieldTypes.SingleLineText;
          Tシャツ_サイズ_150: kintone.fieldTypes.SingleLineText;
        };
      }>;
    };
  }
  interface SavedFields extends Fields {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    作成日時: kintone.fieldTypes.CreatedTime;
    更新日時: kintone.fieldTypes.UpdatedTime;
  }
}
