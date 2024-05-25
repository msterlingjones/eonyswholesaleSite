const searchParams = new URLSearchParams(window.location.search);
function loadTour(i, t) {
    let fi = {};
    let bckBtn = "";
    let preI = i - 1;
    let fwdBtn = "";
    let nextI = (i * 1) + 1;
    let qStr = "id=" + i + "type=" + t;
    let fiCt =0;

    async function getJSON() {
        const response = await fetch("assets/" + t + ".json");
        const itemInfo = await response.json();
        fi = itemInfo.filter(element => element.ID == i);
        console.log(fi[0]);
        fiCt =Object.keys(itemInfo).length;
        console.log(fiCt);
        let headerstr = "<a href=" + t + ".html?" + qStr + " target=_self><img alt=\"image of front of house\" id=appIcon src=images/HouseFront_small.png></a>";

        if (i == 1) {
            bckBtn = "<div id=\"NavPrev\"><a class=navbtn href=" + t + ".html?id=" + i + "&type=" + t + " target=_self>Next </a></div>";
        } else {
            bckBtn = "<div id=\"NavPrev\"><a class=navbtn href=" + t + ".html?id=" + preI + "&type=" + t + " target=_self>&lt</a></div>";
        };
        if (i == fiCt) {
            fwdBtn = "<div id=\"NavNext\"><a href=\"" + t + ".html?id=" + i + "&type=" + t + "\" class=\"navbtn\"> Previous</a></div>";
        } else {
            fwdBtn = "<div id=\"NavNext\"><a href=\"" + t + ".html?id=" + nextI + "&type=" + t + "\" class=\"navbtn\">&gt;</a></div>";
        }

        let detailStr = "<img alt=\"" + fi[0].AltText + " " + fi[0].Id + "\"src=\"" + fi[0].Image + "\"><audio controls autoplay><source src=" + fi[0].Audio + " type=audio/mp4></audio><div id=\"scrollNav\"></div><h1 class=item-title>" + fi[0].Title + "</h1><div id\"BodyContainer\"><p class=item-details>" + fi[0].Details + "</p></div>";

        document.getElementById("detailDiv").innerHTML = detailStr;
        document.getElementById("scrollNav").innerHTML = bckBtn + fwdBtn;
    }
    getJSON();
};
window.addEventListener("load", (event) => {
    var qId = searchParams.get('id');
    var qType = searchParams.get('type');
    loadTour(qId, qType);
});