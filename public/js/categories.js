/**
 * Created by monaruan on 27/06/17.
 */
function dispMenAll() {
    document.getElementById("men-formal").style.display = "none";
    document.getElementById("men-casual-top1").style.display = "none";
    document.getElementById("men-casual").style.display = "none";
    document.getElementById("men-shirt").style.display = "none";
    document.getElementsByClassName("men-sec").style.display = "block";
    document.getElementsByClassName("men-sec-shirt").style.display = "none";
    //document.getElementById("men-pop").style.display = "block";

}

function dispMenCas() {
    document.getElementById("men-casual").style.display = "block";
    document.getElementById("men-formal").style.display = "none";
    document.getElementById("men-casual-top1").style.display = "none";
    //document.getElementById("men-pop").style.display = "none";
    document.getElementsByClassName("men-sec-shirt").style.display = "block";
    document.getElementsByClassName("men-sec").style.display = "none";
}
function dispMenCas1() {
    document.getElementById("men-casual").style.display = "none";
    document.getElementById("men-formal").style.display = "none";
    document.getElementById("men-casual-top1").style.display = "block";
    //document.getElementById("men-pop").style.display = "none";
    document.getElementsByClassName("men-sec-shirt").style.display = "block";
    document.getElementsByClassName("men-sec").style.display = "none";
}

function dispMenForm() {
    document.getElementById("men-formal").style.display = "block";
    document.getElementById("men-casual").style.display = "none";
    document.getElementById("men-casual-top1").style.display = "none";
    //document.getElementById("men-pop").style.display = "none";
    document.getElementsByClassName("men-sec-shirt").style.display = "block";
    document.getElementsByClassName("men-sec").style.display = "none";
}
