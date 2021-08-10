// APIを叩く
async function callApi(url, params) {
  const query = new URLSearchParams(params); // URLSearchParamsは連想配列からクエリパラメータを作成してくれる標準APIです。
  const response = await fetch(url + query);
  const data = await response.json();

  return data;
}

// callApi関数から受け取ったデータをhtmlにレンダリングする
async function renderHtml() {
  const url =
    "https://app.rakuten.co.jp/services/api/Travel/HotelRanking/20170426?";
  const params = {
    applicationId: "ご自身のアプリIDを入力してください", // アプリID
    genre: "onsen", // ジャンル指定
  };
  const data = await callApi(url, params);
  const fragment = document.createDocumentFragment();
  const template = document.getElementById("template");

  for (let i = 0; i < data.Rankings[0].Ranking.hotels.length; i++) {
    const hotel = data.Rankings[0].Ranking.hotels[i].hotel;
    const clone = template.content.cloneNode(true);

    clone.querySelector("h3").textContent =
      hotel.rank + "位" + "  " + hotel.middleClassName; // 順位 + 施設の所在都道府県
    clone.querySelector("img").src = hotel.hotelImageUrl; // 施設画像URL
    clone.querySelector("a").textContent = hotel.hotelName; // 施設名
    clone.querySelector("a").href = hotel.hotelInformationUrl; // 施設情報ページURL
    clone.querySelector("p").innerHTML = hotel.userReview; // お客様の声

    fragment.appendChild(clone);
  }
  document.querySelector("ul").appendChild(fragment);
}

renderHtml();
